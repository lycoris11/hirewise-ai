import { Auth, API, Storage } from 'aws-amplify'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import '../configureAmplify'

export default function Protected(){

  //Enhancements: 
  //Check to see if a file with that name already exists.
  //Option to delete a file from the S3 bucket


  const[user, setUser] = useState(null);
  const[jdr, setJDR] = useState({job_description:"", resume:""});
  const[fileName, setFileName] = useState('');
  const[jdFileData, setJDFileData] = useState();
  const[aiOutput, setAIOutput] = useState('');
  const[pdfOutput, setpdfOutput] = useState('');
  const[fileUploaded, setFileUploaded] = useState(false);
  
  const router = useRouter();
  
  const api = 'api76df32da';

  Storage.configure({ level: 'private' });

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser(){
    try{
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
    } catch(err){ 
      setUser(null);
      router.push('/profile');
    };
  };

  function updateJDR(e){
    setJDR({...jdr, [e.target.name]: e.target.value});
  }


  async function compareJDandResume(){
    const body = {body:jdr};
    console.log(body);
    console.log(JSON.stringify(body));
    API.post(api, '/compare', body)
      .then((res) => {
        console.log(res);
        setAIOutput(res.response);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  async function getResumePDFText(){
    const userIdentityId = (await Auth.currentCredentials()).identityId;
    console.log(userIdentityId);
    const body = {body:{
      identityID:userIdentityId,
      fileName: fileName
    }};
    API.post(api, '/fileToText', body)
      .then((res) => {
        console.log(res);
        setpdfOutput(res.response);
      })
      .catch((err) =>{
        console.log(err);
      });
  }

  async function uploadFile(){
    try{
      const result = await Storage.put(jdFileData.name, jdFileData, {
        contentType: jdFileData.type,
      });
      console.log(result.key);
      setFileName(result.key);
      setFileUploaded(true);
    }catch(err){
      console.error('Unexpected error while uploading', err);
    }
  }

  //The aws s3 bucket saves the files under "protected/{user_identity_id}/file.pdf"
  //can get identity id from const x = (await Auth.currentCredentials()).identityId;

  async function listfiles(){
    Storage.list('') // for listing ALL files without prefix, pass '' instead
      .then(({ results }) => console.log(results))
      .catch((err) => console.log(err));
  }
  
  if(!user) return null;

  return(
    <>
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
            onClick={() => compareJDandResume()}>
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
            onClick={uploadFile}
          >Upload File
          </button>
        </div>
        <div>
          {fileUploaded ? (
            <button onClick={getResumePDFText}>get Resume PDF Text</button>
          ): ''}
        </div>
        <div>
          <button onClick={listfiles}>List files</button>
        </div>
        <div>
          {pdfOutput}
        </div>
      </div>
    </>
  )
}