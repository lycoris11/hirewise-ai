import { Auth, API, Storage } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '../configureAmplify';
import NavBar from '../components/NavBar';
import UploadJD from '../components/UploadJD';
import ResumeUploads from '../components/ResumeUploads';
import SidePanel from '../components/SidePanel';
import Link from 'next/link';

export default function Protected(){

  //Enhancements: 
  //Option to delete a file from the S3 bucket


  const[user, setUser] = useState(null);
  const[resumeFileForm, setResumeFileForm] = useState({resumeFileData:null});
  const[aiOutput, setAIOutput] = useState('');
  const[userIdentityId, setUserIdentityId] = useState('');
  const[mainPanelState, setMainPanelState] = useState(null);
  const[currentJD, setCurrentJD] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  
  const router = useRouter();
  const api = 'api76df32da';

  Storage.configure({ level: 'private' });

  useEffect(() => {
    checkUser();
    //getJDFiles();
    //jdFiles.length > 0 ? setMainPanelState('ResumeUploads') : 
    setMainPanelState('UploadJD')
  }, []);

  async function checkUser(){
    try{
      const user = await Auth.currentAuthenticatedUser();
      setUserIdentityId((await Auth.currentCredentials()).identityId);
      setUser(user);
    } catch(err){ 
      setUser(null);
      router.push('/profile');
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
  
  if(!user) return null;

  return(
    <>
      <div className='flex flex-col justify-center items-center self-stretch bg-gray-800'>
        
        <div className='flex h-20 justify-between items-center self-stretch'>
          <div className='flex w-full py-0 px-12 justify-between self-stretch'>

            <div className="flex items-center gap-8">
              <div>Logo</div>

              <Link className='flex py-2 px-3' href='/'>
                <a className='font-normal text-2xl text-white'>Hirewise AI</a>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <button className="text-white bg-white text-md bg-opacity-20 py-2 px-4 rounded-lg"
                onClick = {() => {
                  Auth.signOut();
                  setUser(null);
                }}
              >Sign Out
              </button>
            </div>

          </div>
        </div>

        <div className='flex w-full py-0 px-12 flex-col'>
          <hr className="h-px self-stretch border-gray-700" />
        </div>


      </div>
      {
        mainPanelState === 'UploadJD' && (
          <UploadJD
            userIdentityId={userIdentityId}
            setMainPanelState={setMainPanelState}
            setCurrentJD={setCurrentJD}
          />
        )
      }

      {
        mainPanelState === 'ResumeUploads' && (
          <ResumeUploads
            userIdentityId={userIdentityId}
            currentJD={currentJD}
            setResumeFileForm={setResumeFileForm}
            uploadResumeFileToS3={uploadResumeFileToS3}
            aiOutput={aiOutput}
          />
        )
      }
      
      {/*          
      <div className='min-h-screen'>
        <div className='max-w-full h-screen'>
          <div className="flex flex-row mx-8 my-4 h-85p shadow-form rounded-md">
            <div className='flex flex-col bg-indigo-700 overflow-y-auto basis-1/5 border-r-2 border-gray-100 scrollbar-slate'>
              <SidePanel
                jdFiles={jdFiles}
                setCurrentJD={setCurrentJD}
                setMainPanelState={setMainPanelState}
              />
            </div>
            <div className='flex flex-col basis-4/5 overflow-y-scroll'>
              {
                mainPanelState === 'Loading' && (
                  <div className="flex items-center justify-center w-full h-full">
                    <div role="status">
                      <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-indigo-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )
              }
              {
                mainPanelState === 'ResumeUploads' && (
                  <ResumeUploads
                    userIdentityId={userIdentityId}
                    currentJD={currentJD}
                    setResumeFileForm={setResumeFileForm}
                    uploadResumeFileToS3={uploadResumeFileToS3}
                    aiOutput={aiOutput}
                  />
                )
              }
              {
                mainPanelState === 'UploadJD' && (
                  <UploadJD
                    setJDFileForm={setJDFileForm}
                    jdFileForm={jdFileForm}
                    uploadJDFileToS3={uploadJDFileToS3}
                  />
                )
              }
            </div>
          </div>
        </div>
            </div>*/}
    </>
  )
}