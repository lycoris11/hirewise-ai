import { Auth } from "aws-amplify";
import Input from "./Input";

export default function SignUp({onChange, setUiState, signUp}){

    return(
      <>
        <p className="font-semibold text-[38px] md:text-[48px] leading-tight">Sign Up.</p>
  
        <div className="mt-10">
          <label className="text-sm">Email</label>
          <Input onChange={onChange} name='email'/>
        </div>
  
        <div className="mt-4">
          <label className="text-sm">Password</label>
          <Input onChange={onChange} name='password' type='password'/>
        </div>
  
        <button className="text-white w-full mt-6 bg-pink-600 p-3 rounded"
          onClick={signUp}
        >Sign Up
        </button>
  
        <p className="mt-12 text-sm font-light">Have an account?
          <span className="cursor-pointer text-pink-600"
            onClick={() => setUiState('signIn')}
            role="button"
          > Sign in.
          </span>
        </p>
      </>
    )
  }