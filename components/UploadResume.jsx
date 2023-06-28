import { useState } from 'react';
import {useDropzone} from 'react-dropzone';

export default function UploadResume({setResumeFileForm, uploadResumeFileToS3, jdFileForm}){

  const [fileSelectError, setFileSelectError] = useState('');
  const [fileSelectSuccess, setFileSelectSuccess] = useState('');
  
  const onDrop = (acceptedFiles,rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setFileSelectSuccess('');
      setFileSelectError('Please select only one PDF file.');
    } else {
      setFileSelectError(''); // Clear any previous error
      setFileSelectSuccess(`${acceptedFiles[0].path} - ${acceptedFiles[0].size} + bytes`)
      setResumeFileForm({ ...jdFileForm, jdFileData: acceptedFiles[0] });
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
    <>
      <div className="mt-12 px-16">
        <h1 className="font-bold text-4xl text-indigo-500">Upload a Resume</h1>
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
        </div>
        
        {fileSelectError && <p className="text-red-500">{fileSelectError}</p>}
        {fileSelectSuccess && <p className="text-green-500">{fileSelectSuccess}</p>}
        <button
          type="submit"
          onClick={() => {
            uploadResumeFileToS3()
          }}
        >Upload Resume File
        </button>
      </div>
    </>
  )
}