import { Auth } from "aws-amplify";
import { FaGoogle } from 'react-icons/fa'
import { useRouter } from 'next/router';

export default function SocialSignIn({setUiState}){

  const router = useRouter();

  async function handleSocialSignIn(){
    try{
      await Auth.federatedSignIn({provider: 'Google'})
      setUiState('signedIn')
    } catch(err){
      console.log({err});
    }
  }

  return(
    <>
        <button 
          onClick={() => handleSocialSignIn()} 
          className={`
            flex justify-center items-center py-2 px-4
            self-stretch shadow-sm rounded-md
            hover:transition-transform hover:-translate-y-1 hover:ease-in-out 
            hover:duration-500 duration-500
            bg-white
            border
            border-gray-300`}
        ><FaGoogle size="20" className="text-gray-500"></FaGoogle>
        </button>
    </>
  )
}