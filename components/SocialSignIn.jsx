import { Auth } from "aws-amplify";
import { FaGoogle } from 'react-icons/fa'

export default function SocialSignIn(){

  return(
    <>
        <button 
          onClick={() => Auth.federatedSignIn({provider: 'Google'})} 
          className={`
            flex justify-center items-center py-2 px-4
            self-stretch shadow-sm rounded-md
            hover:transition-transform hover:scale-x-105 hover:-translate-y-1 hover:ease-in-out 
            hover:duration-500 duration-500
            bg-white
            border
            border-gray-300`}
        ><FaGoogle size="28" className="text-gray-500"></FaGoogle>
        </button>
    </>
  )
}