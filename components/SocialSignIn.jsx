import { Auth } from "aws-amplify";
import { FaGoogle } from 'react-icons/fa'

export default function SocialSignIn(){

  return(
    <>
      <div className="flex flex-col">
        <button className="mt-10 focus:outline-none"
          onClick={() => Auth.federatedSignIn({provider: 'Google'})}  
        >
          <div className="flex border bg-gray-800 text-gray-100 border-gray-300 p-2 rounded-full items-center justify-center">
            <FaGoogle size="28" className="text-red-600"></FaGoogle>
            <p className="ml-3">Sign in with Google</p>
          </div>
        </button>
      </div>
    </>
  )
}