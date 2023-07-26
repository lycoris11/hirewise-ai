import { useState, useEffect } from 'react';
import {useDropzone} from 'react-dropzone';
import UploadJobModal from '../components/UploadJobModal';
import SidePanel from '../components/SidePanel';
import { Storage } from 'aws-amplify';

export default function UploadJD({userIdentityId, setMainPanelState, setCurrentJD}){
  
  const [isModalVisible, setModalVisible] = useState(false);
  const[jdFiles, setJDFiles] = useState([]);

  useEffect(() => {
    getJDFiles();
  }, []);

  async function getJDFiles(){
    //the commented out code is more performant, while the code below is more readable.
    try{
      const { results } = await Storage.list('', {pageSize:'ALL'});
      const topLevelFiles = results
        .map(obj => obj.key)
        .filter(file => !file.includes('/'));
      setJDFiles(topLevelFiles);
    }catch(err){
      console.log(err);
    };
    /*try{
      const files = await Storage.list('', {pageSize:'ALL'});
      const fileData = files.results;
      let keys = fileData.map(obj => obj.key)
      const topLevelFiles = [];
      for (let i = 0; i < keys.length; i++) {
        const file = keys[i];
        if (!keys[i].includes("/")) {
          topLevelFiles.push(file);
        }
      }
      setJDFiles(topLevelFiles);
    }catch(err){
      console.log(err);
    };*/
  };
  

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      {isModalVisible && 
        <UploadJobModal
          userIdentityId={userIdentityId}
          closeModal={closeModal}
          jdFiles={jdFiles}
          getJDFiles={getJDFiles}
        />
      }

      <div className="flex py-10 px-12 justify-center items-center self-stretch bg-gray-800">
        <div className='flex w-full justify-between items-start'>
          <p className='text-4xl leading-9 font-semibold text-white'>Welcome, Recruiter!</p>
        </div>

        <button 
          onClick={() => {openModal(true)}}
          className='flex py-2 px-4 justify-center items-center gap-2 rounded-md bg-indigo-500 shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <div className='text-sm leading-5 font-medium text-white whitespace-nowrap'>Upload a Job</div>
        </button>
      </div>

      <SidePanel
                jdFiles={jdFiles}
                setCurrentJD={setCurrentJD}
                setMainPanelState={setMainPanelState}
              />
      {/*<div className="mt-12 px-16">
        <h1 className="font-bold text-4xl text-indigo-500">Upload a Job Description</h1>
        <div className="mt-4 flex items-center justify-center w-full">
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
        </div>*/}
        
        {/*}
        {<input
          placeholder='Job Name *'
          name="jobName" 
          type="text" 
          onChange={updateJDFileName} />}


        {fileSelectError && <p className="text-red-500">{fileSelectError}</p>}
        {fileSelectSuccess && <p className="text-green-500">{fileSelectSuccess}</p>}
        <button
          type="submit"
          onClick={() => {
            uploadJDFileToS3()
          }}
        >Upload JD File
        </button>
      </div>*/}
    </>
  )
}