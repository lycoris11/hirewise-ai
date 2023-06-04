import { Auth } from "aws-amplify";
import { FaGoogle } from 'react-icons/fa'

export default function SocialSignIn(){

  return(
    <>
      <div className="flex flex-col 
        hover:shadow-inputfocus 
        hover:transition-transform 
        hover:-translate-y-0.5 
        hover:ease-in-out 
        duration-700">
        <button className="mt-8 focus:outline-none"
          onClick={() => Auth.federatedSignIn({provider: 'Google'})}  
        >
          <div className="flex border bg-black text-gray-100 border-gray-100 p-2 rounded-md items-center justify-center">
            <FaGoogle size="28" className="text-red-600"></FaGoogle>
            <p className="ml-3">Sign in with Google</p>
          </div>
        </button>
      </div>
    </>
  )
}