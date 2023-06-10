import { Auth } from "aws-amplify";
import Input from "./Input";

export default function SignUp({onChange, setUiState, signUp, shake}){

    return(
      <>
        <p className="mt-4 text-gray-100 text-4xl sm:text-3xl md:text-4xl sm:leading-tight md:leading-tight">Create an Account.</p>
  
        <div className="mt-12">
          <Input 
            onChange={onChange} 
            name='email'
            placeholder="Email *"/>
        </div>
  
        <div className="mt-4">
          <Input 
            onChange={onChange} 
            name='password' 
            type='password'
            placeholder="Password *"/>
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
          onClick={signUp}
        >Create Account</button>
        </div>
  
        <p className="mt-12 text-sm font-bold text-gray-100">Have an account?
          <span className="cursor-pointer text-pink-600"
            onClick={() => setUiState('signIn')}
            role="button"
          > Sign in.
          </span>
        </p>
      </>
    )
  }