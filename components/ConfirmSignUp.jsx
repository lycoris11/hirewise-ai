import { Auth } from "aws-amplify";
import Input from "./Input";

export default function ConfirmSignUp({onChange, setUiState, confirmSignUp, shake}){

    return(
      <>
        <p className="mt-4 text-gray-100 text-4xl sm:text-3xl md:text-4xl sm:leading-tight md:leading-tight">Confirm your account.</p>
  
        <div className="mt-10">
          <Input
            onChange={onChange}
            name='authCode'
            placeholder="Token *"/>
        </div>
  
        <div className={shake ? 'shake': ''}>
        <button 
          className="rounded-md mt-12 w-full py-2 px-4 text-gray-100 bg-black border border-gray-100 hover:bg-gray-900 focus:outline-none
            hover:shadow-inputfocus 
            hover:transition-transform 
            hover:-translate-y-0.5 
            hover:ease-in-out 
            duration-700
          "
          onClick={confirmSignUp}
        >Authenticate</button>
        </div>

        <button className="text-sm mt-6 text-pink-500"
          onClick={() => setUiState('signIn')}
        >Cancel
        </button>
      </>
    )
  }