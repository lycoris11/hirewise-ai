import { API } from 'aws-amplify';
import '../configureAmplify';
import UploadResume from "./UploadResume"
import { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';
import { ArrowLeftIcon } from '@heroicons/react/20/solid'



export default function ResumeUploads({ userIdentityId, currentJD, setMainPanelState}){

  const[resumeData, setResumeData] = useState([]);
  const[aiOutput, setAIOutput] = useState('');
  const[resumeFileForm, setResumeFileForm] = useState({resumeFileData:null});
  const[finishedQueryingResponses, setFinishedQueryingResponses] = useState(false);

  const api = 'api76df32da';

  useEffect(() => {

    let isCancelled = false;
    getResumes(isCancelled);

    return () => {
      isCancelled = true;
    }

  }, [currentJD])

  async function getResumes(isCancelled){
    const body = {body:{
      identityID:userIdentityId,
      jdName: currentJD
    }};

    try {
      const result = await API.post(api, '/db/getResume', body);
      if(!isCancelled || isCancelled === undefined){
        setResumeData(result.response.records);
        setFinishedQueryingResponses(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

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

  async function isGoodCandidateMatch(resumeText){
    const body = {body:{
      identityID:userIdentityId,
      jdName:currentJD,
      resumeText: resumeText
    }};

    try {
      const result = await API.post(api, '/compare', body);
      setAIOutput(result.response);
      return Promise.resolve(result.response);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async function saveUploadedResumeFileToDB(resumeText, aiResponse, score){
    const body = {body:{
      identityID:userIdentityId,
      jdName:currentJD,
      score: score,
      resumeText: resumeText,
      resumeOutput: aiResponse
    }};

    try{
      const result = await API.post(api, '/db/uploadResume', body);
      return Promise.resolve(result.response);
    }catch(err){
      console.log(err);
      return Promise.reject(err);
    }
  }

  function getScore(aiResponse){
    const regex = /Score: (\d+)/;
    const match = regex.exec(aiResponse);
    const score = match ? Number(match[1]) : null;
    return score;
  }

  async function processResume(key){
    const resumeText = await extractFileText(key);
    const aiResponse = await isGoodCandidateMatch(resumeText);
    return {resumeText, aiResponse};
  }

  async function uploadResumeFileToS3(){
    try{
      const result = await Storage.put(currentJD+'/'+resumeFileForm.jdFileData.name, resumeFileForm.jdFileData, {
        contentType: resumeFileForm.jdFileData.type,
      });

      const { key } = result;
      const {resumeText, aiResponse } = await processResume(key)

      const score = getScore(aiResponse)
      await saveUploadedResumeFileToDB(resumeText, aiResponse, score)
    }catch(err){
      console.error('Unexpected error while uploading', err);
    };
  };

  async function handleSubmit(){
    try{
      await uploadResumeFileToS3();
      getResumes();
    }catch(e){
      console.log(e);
    }
  }
  
  return (
    <>
      <div className="flex py-10 px-12 justify-center items-center self-stretch bg-gray-800">
        <div className='flex w-full justify-between items-start'>
          <p className='text-4xl leading-9 font-semibold text-white'>Welcome, Recruiter!</p>
        </div>

        <div className='flex gap-2'>
          <button
            onClick={() => {setMainPanelState("Jobs")}}
            type="button"
            className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300 ease-in-out transform hover:-translate-x-1 focus:scale-110"
          >
            <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button 
            onClick={() => {openModal(true)}}
            className='flex py-2 px-4 justify-center items-center gap-2 rounded-md bg-indigo-500 shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <div className='text-sm leading-5 font-medium text-white whitespace-nowrap'>Upload a Resume</div>
          </button>
        </div>
      </div>

      <div className="mt-12 px-16">
        <h1 className="font-bold text-4xl text-indigo-500">Match Candidates - {currentJD}</h1>
        <div className="mt-4 flex flex-col items-center justify-center w-full">
          <UploadResume
            setResumeFileForm={setResumeFileForm}
            uploadResumeFileToS3={uploadResumeFileToS3}
          />

          <button
            className="justify-left"
            type="submit"
            onClick={() => {
              handleSubmit();
            }}
          >Get Results
          </button>
          {/*<div>{aiOutput}</div>*/}

          <div>
            {
              (resumeData.length == 0 && !setFinishedQueryingResponses) ? (
                <>
                  <div className="flex items-center justify-center w-full h-full py-24">
                    <div role="status">
                      <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-indigo-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </>
              ) : (
                resumeData.map((item, i)=>{
                  return (
                    <div key={i} className='mt-4'>
                      <p>{item[5].stringValue}</p>
                    </div>
                  )
                })
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}