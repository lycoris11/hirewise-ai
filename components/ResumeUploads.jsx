import { API } from 'aws-amplify';
import '../configureAmplify';
import UploadResume from "./UploadResume"
import { useState, useEffect } from 'react';


export default function ResumeUploads({ userIdentityId, currentJD, setResumeFileForm, uploadResumeFileToS3, aiOutput }){

  const[resumeData, setResumeData] = useState([]);

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