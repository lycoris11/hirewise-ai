import { Auth } from "aws-amplify";
import SocialSignIn from './SocialSignIn'
import Input from "./Input";

export default function SignIn({onChange, setUiState, signIn, shake}){

  return(
    <>
      <h1 className="font-bold text-6xl text-white">Hirewise A.I.</h1>
      <p className="mt-4 text-white text-4xl sm:text-3xl md:text-4xl sm:leading-tight md:leading-tight">Welcome back,<br/>sign in to continue.</p>
      <p className="mt-4 text-sm font-bold text-white">Don&apos;t have an account?
        <span className="cursor-pointer text-pink-600 underline ml-2 underline-offset-2"
          onClick={() => setUiState('signUp')}
          role="button"
        >Create one now.</span>
      </p>

      <div className="mt-10">
        <label className="text-sm text-white">Email</label>
        <Input onChange={onChange} name='email' type="text"/>
      </div>

      <div className="mt-4">
        <label className="text-sm text-white">Password</label>
        <Input
          onChange={onChange} 
          name='password' 
          type='password'/>
      </div>

      <div className="mt-2 text-pink-500 text-right">
        <span
          onClick={() => setUiState('forgotPassword')}
          role="button"
        >Password help?</span>  
      </div>
      
      <div className={shake ? 'shake': ''}>
        <button 
          className="rounded-md mt-8 w-full py-2 px-4 text-gray-100 bg-gray-800 hover:bg-gray-900 focus:outline-none
            hover:shadow-inputfocus 
            hover:transition-transform 
            hover:-translate-y-0.5 
            hover:ease-in-out 
            duration-700
          "
          onClick={signIn}
        >Sign In</button>
      </div>

      <div className="mt-16">
        <span class="SeparatorRow LoginDefaultView-separatorRow">
          <span class="SeparatorRow-horizontalLine"></span>
          <span className="text-gray-400 mx-2">or</span>
          <span class="SeparatorRow-horizontalLine"></span>
        </span>
      </div>
      
      <SocialSignIn/>
    </>
  )
}