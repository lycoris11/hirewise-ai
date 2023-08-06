import { useState, useEffect } from 'react';
import UploadJobModal from './UploadJobModal';
import { Storage } from 'aws-amplify';
import JobsTable from './JobsTable';

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

      <div className='flex flex-col w-full justify-center items-center'>
        <div className='flex flex-col w-9/12'>
          <JobsTable
            jdFiles={jdFiles}
            setCurrentJD={setCurrentJD}
            setMainPanelState={setMainPanelState}
          />
        </div>
      </div>
    </>
  )
}