import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {useDropzone} from 'react-dropzone';
import { API, Storage } from 'aws-amplify';

export default function UploadJobModal({closeModal, userIdentityId, jdFiles,getJDFiles}) {
  const [open, setOpen] = useState(true);
  const [fileSelectError, setFileSelectError] = useState('');
  const [fileSelectSuccess, setFileSelectSuccess] = useState('');
  const[jdFileForm, setJDFileForm] = useState({jobName:'', jdFileData:null});
  const[loading, setLoading] = useState(null);

  const api = 'api76df32da';

  const cancelButtonRef = useRef(null);

  async function uploadJDFileToS3(){
    if(!jdFiles.includes(jdFileForm.jobName)){
      setLoading('Loading');
      try{
        const result = await Storage.put(jdFileForm.jobName, jdFileForm.jdFileData, {
          contentType: jdFileForm.jdFileData.type,
        });

        getJDFiles();
        const text = await extractFileText(result.key);
        saveUploadedJDFileToDB(text, result.key);

        setLoading('doneLoading');
      }catch(err){
        console.error('Unexpected error while uploading', err);
      };
    }else{
      //Add logic to notify user that the file with filename already exists.
      console.log("File already exists");
    };
  };

  async function extractFileText(f){
    const body = {body:{
      identityID:userIdentityId,
      fileName: f
    }};
    try {
      const result = await API.post(api, '/fileToText', body);
      return Promise.resolve(result.response);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async function saveUploadedJDFileToDB(pdf_text, file){
    const body = {body:{
      identityID:userIdentityId,
      text: pdf_text,
      fileName: file
    }};

    try{
      const result = await API.post(api, '/db/uploadJD', body);
      setOpen(false);
      setTimeout(() => {
        closeModal();
      }, 250);
    }catch(err){
      console.log(err);
    }
  }

  function updateJDFileName(e){
    setJDFileForm({...jdFileForm, jobName: e.target.value});
  }

  const onDrop = (acceptedFiles,rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      // If any files are rejected (not PDF or more than 1 file), show an error
      setFileSelectSuccess('');
      setFileSelectError('Please select only one PDF file.');
    } else {
      setFileSelectError(''); // Clear any previous error
      setFileSelectSuccess(`${acceptedFiles[0].path} - ${acceptedFiles[0].size} + bytes`)
      // Update the jdFileForm object with the selected file
      setJDFileForm({ ...jdFileForm, jdFileData: acceptedFiles[0] });
    }
  };

  const {getRootProps, getInputProps, isDragActive} = useDropzone(
    {
      maxFiles:1,
      accept: {
        'application/pdf': [],
      },
      onDrop
    }
  );

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} 
        onClose={() => {
          setOpen(false);
          setTimeout(() => {
            closeModal();
          }, 250);} }
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                {loading === "Loading" ? 
                  <>
                    <div className="flex items-center justify-center w-full h-full py-24">
                      <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-indigo-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </>:
                  <>
                    <div className="mt-4 flex flex-col items-center justify-center w-full gap-8">
                  
                    <input
                      className='w-full'
                      placeholder='Job Name *'
                      name="jobName" 
                      type="text" 
                      onChange={updateJDFileName} />
                    
                    <div
                      {...getRootProps()}
                      className={`
                      flex flex-col items-center justify-center
                      w-full h-full
                      border-2 border-gray-300 border-dashed rounded-lg
                      hover:bg-gray-100 ${
                        isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-400'
                      }`}>
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path 
                              strokeLinecap="round"
                              strokeLinejoin="round" 
                              strokeWidth="2" 
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                            </path>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to Upload </span> 
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">Select a single PDF</p>
                        </div>
                        <input
                          {...getInputProps()}
                          id="dropzone-file"
                          name="jdFileData" 
                          type="file" 
                        />
                      </div>
                    </div>

                    {fileSelectError && <p className="text-red-500">{fileSelectError}</p>}
                    {fileSelectSuccess && <p className="text-green-500">{fileSelectSuccess}</p>}
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                      onClick={() => {
                        uploadJDFileToS3();
                      }}
                    >
                      Upload
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      onClick={() => {
                        setOpen(false);
                        setTimeout(() => {
                          closeModal();
                        }, 250);
                      }}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                  </>}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}