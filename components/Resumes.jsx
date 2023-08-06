import { API } from 'aws-amplify';
import '../configureAmplify';
import UploadResume from "./UploadResume"
import { useState, useEffect } from 'react';


export default function ResumeUploads({ userIdentityId, currentJD, setMainPanelState}){

  const[resumeData, setResumeData] = useState([]);
  const[aiOutput, setAIOutput] = useState('');
  const[resumeFileForm, setResumeFileForm] = useState({resumeFileData:null});

  const api = 'api76df32da';

  useEffect(() => {

    let isCancelled = false;
    getResumes(isCancelled);

    return () => {
      isCancelled = true;
    }

  }, [currentJD])

  async function getResumes(isCancelled){
    console.log(userIdentityId)
    console.log(currentJD)
    const body = {body:{
      identityID:userIdentityId,
      jdName: currentJD
    }};

    try {
      const result = await API.post(api, '/db/getResume', body);
      if(!isCancelled || isCancelled === undefined){
        const returnedData = result.response.records.map(record => record);
        setResumeData(returnedData);
        console.log(returnedData)
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

        <button 
          onClick={() => {openModal(true)}}
          className='flex py-2 px-4 justify-center items-center gap-2 rounded-md bg-indigo-500 shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <div className='text-sm leading-5 font-medium text-white whitespace-nowrap'>Upload a Resume</div>
        </button>
      </div>

      <button onClick={() => {setMainPanelState("Jobs")}}>BACK</button>

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
              resumeData.map((item, i)=>{
                return (
                  <div key={i} className='mt-4'>
                    <p>{item[5].stringValue}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}