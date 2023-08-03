import { Auth } from "aws-amplify";
import { EmailInput, PasswordInput, ButtonSubmit } from "./Inputs";
import SocialSignIn from "./SocialSignIn";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignUp({onChange, setUiState, signUp, shake, emailAddr}){

  const router = useRouter();

  useEffect(() => {
    router.push('/profile')
  }, [])

    return(
      <>

        <div className="flex flex-start h-screen flex-grow flex-shrink-0 basis-0 self-stretch">
          <div className="flex flex-col basis-1/2 justify-center items-center py-12 px-24 self-stretch">

            <div className="flex flex-col gap-6 pb-24 w-96">
              
              <div className="flex flex-col items-start gap-6">
                <div>
                  Logo
                </div>
                <div className="flex flex-col flex-start gap-2">
                  <div className="text-4xl leading-9 font-semibold">Sign up for Hirewise</div>
                </div>
              </div>

              {/*Social Sign in*/}
              <div className="flex flex-col items-start gap-1">
                <div className="text-sm leading-5 font-medium text-gray-900">Sign in with</div>
                <SocialSignIn/>
              </div>
 
              {/*Or continue with*/}
              <div className="flex justify-center items-center gap-2 self-stretch">
                <hr className="h-px flex-grow flex-shrink-0 basis-0" />
                <span className="text-sm text-gray-900">Or continue with</span>
                <hr className="h-px flex-grow flex-shrink-0 basis-0" />
              </div>  
              

              {/**Email Input */}
              <div className="flex flex-col self-stretch gap-1">
                <EmailInput onChange={onChange} emailAddr={emailAddr}/>
              </div>
              

              {/**Password Input */}
              <div className="flex flex-col self-stretch gap-1">
                <PasswordInput onChange={onChange}/>
              </div>

              <div className="flex self-end px-1 text-indigo-500">
                <span
                  onClick={() => setUiState('signIn')}
                  role="button"
                >Have an account?</span>  
              </div>
              
              <ButtonSubmit onClick={signUp} shake={shake} text="Sign Up"/>
              

            </div>

          </div>
          
          <div className="flex flex-col basis-1/2 justify-center items-center self-stretch">
            <img className="object-cover w-full h-full" src="/sign-in-split.png" alt="Sign In Image"></img>
          </div>
        </div>
      {/*
        <p className="mt-4 text-gray-100 text-4xl sm:text-3xl md:text-4xl sm:leading-tight md:leading-tight">Create an Account.</p>
  
        <div className="mt-12">
          <Input 
            onChange={onChange} 
            name='email'
            placeholder="Email *"/>
        </div>*/}{/*
  
        <div className="mt-4">
          <Input 
            onChange={onChange} 
            name='password' 
            type='password'
            placeholder="Password *"/>
        </div>*/}{/*

        <div className={shake ? 'shake': ''}>
        <button 
          className="rounded-md mt-12 w-full py-2 px-4 text-gray-100 bg-black border border-gray-100 hover:bg-gray-900 focus:outline-none
            hover:shadow-inputfocus 
            hover:transition-transform 
            hover:-translate-y-0.5 
            hover:ease-in-out 
            duration-700
          "*/}{/*
          onClick={signUp}
        >Create Account</button>
        </div>
  
        <p className="mt-12 text-sm font-bold text-gray-100">Have an account?
          <span className="cursor-pointer text-pink-600"
            onClick={() => setUiState('signIn')}
            role="button"
          > Sign in.
          </span>
        </p>*/}
      </>
    )
  }