import { Auth, API, Storage } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '../configureAmplify';
import Jobs from '../components/Jobs';
import Resumes from '../components/Resumes';
import Link from 'next/link';

export default function Protected(){

  //Enhancements: 
  //Option to delete a file from the S3 bucket


  const[user, setUser] = useState(null);
  const[userIdentityId, setUserIdentityId] = useState('');
  const[mainPanelState, setMainPanelState] = useState(null);
  const[currentJD, setCurrentJD] = useState('');
  
  const router = useRouter();
  const api = 'api76df32da';

  Storage.configure({ level: 'private' });

  useEffect(() => {
    checkUser();
    //getJDFiles();
    //jdFiles.length > 0 ? setMainPanelState('ResumeUploads') : 
    setMainPanelState('Jobs')
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
        mainPanelState === 'Jobs' && (
          <Jobs
            userIdentityId={userIdentityId}
            setMainPanelState={setMainPanelState}
            setCurrentJD={setCurrentJD}
          />
        )
      }

      {
        mainPanelState === 'Resumes' && (
          <Resumes
            userIdentityId={userIdentityId}
            setMainPanelState={setMainPanelState}
            currentJD={currentJD}
          />
        )
      }
    </>
  )
}