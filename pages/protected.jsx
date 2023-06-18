import { Auth, API, Storage } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '../configureAmplify';
import NavBar from '../components/NavBar';

export default function Protected(){

  //Enhancements: 
  //Option to delete a file from the S3 bucket


  const[user, setUser] = useState(null);
  const[jdr, setJDR] = useState({job_description:"", resume:""});
  const[fileName, setFileName] = useState('');
  const[jdFileData, setJDFileData] = useState(null);
  const[aiOutput, setAIOutput] = useState('');
  const[jobDescText, setJobDesText] = useState('');
  const[fileUploaded, setFileUploaded] = useState(false);
  const[usersFiles, setUsersFiles] = useState([]);
  const [userIdentityId, setUserIdentityId] = useState('');
  
  const router = useRouter();
  const api = 'api76df32da';

  Storage.configure({ level: 'private' });

  useEffect(() => {
    checkUser();
    getUsersFiles();
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

  async function getUsersFiles(){
    try{
      const files = await Storage.list('');
      const fileData = files.results;
      let keys = fileData.map(obj => obj.key)
      setUsersFiles(keys);
    }catch(err){
      console.log(err);
    };
  };

  async function uploadJDFileToS3(){
    if(!usersFiles.includes(jdFileData.name)){
      try{
        const result = await Storage.put(jdFileData.name, jdFileData, {
          contentType: jdFileData.type,
        });
        setFileName(result.key);
        setFileUploaded(true);
        getUsersFiles();
        const text = await extractJobDescText(result.key)
        saveUploadedFileToDB(text, result.key);
      }catch(err){
        console.error('Unexpected error while uploading', err);
      };
    }else{
      //Add logic to notify user that the file with filename already exists.
      console.log("File already exists");
    };
  };

  
  async function extractJobDescText(f){
    const body = {body:{
      identityID:userIdentityId,
      fileName: f ? f : fileName
    }};
    try {
      const result = await API.post(api, '/fileToText', body);
      setJobDesText(result.response);
      return Promise.resolve(result.response);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async function saveUploadedFileToDB(pdf_text, file){
    const body = {body:{
      identityID:userIdentityId,
      text: pdf_text,
      fileName: file
    }};

    try{
      const result = await API.post(api, '/db/uploadJD', body)
    }catch(err){
      console.log(err);
    }
  }

  function updateJDR(e){
    setJDR({...jdr, [e.target.name]: e.target.value});
  }

  async function isGoodCandidateMatch(){
    const body = {body:jdr};

    API.post(api, '/compare', body)
      .then((res) => {
        setAIOutput(res.response);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  async function listfiles(){
    Storage.list('') // for listing ALL files without prefix, pass '' instead
      .then(( {results} ) => console.log(results))
      .catch((err) => console.log(err));
  }
  
  if(!user) return null;

  return(
    <>
      <NavBar state={'protected'}/>
      <div>
        <p>Protected Route!</p>
      </div>

      <div className='min-h-screen'>
        <div className="flex flex-row">
          <div className='flex flex-col items-center basis-1/2'>
            <textarea 
              onChange={updateJDR}
              name="job_description"
              placeholder="Your message..."></textarea>
          </div>
          <div className='flex flex-col items-center basis-1/2'>
            <textarea
              onChange={updateJDR}
              name="resume"
              placeholder="Your message..."></textarea>
          </div>
        </div>
        <div className="flex flex-row">
          <button
            onClick={() => isGoodCandidateMatch()}>
            Submit
          </button>
          <p>{aiOutput}</p>
        </div>
        <div className="flex flex-row">
          <input 
            name="jdFile" 
            type="file" 
            onChange={(e) => setJDFileData(e.target.files[0])} />
        </div>
        <div>
          <button
            onClick={uploadJDFileToS3}
          >Upload JD File
          </button>
        </div>
        <div>
          {fileUploaded ? (
            <button onClick={extractJobDescText}>get Resume PDF Text</button>
          ): ''}
        </div>
        <div>
          <button onClick={listfiles}>List files</button>
        </div>
        <div>
          {jobDescText}
        </div>
        <div>
          {
            usersFiles.map((item)=>{
              return (<p key={item}>{item}</p>)
            })
          }
        </div>
      </div>
    </>
  )
}