import { Auth } from "aws-amplify";
import Input from "./Input";
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
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email *
                </label>
                <input
                  onChange={onChange} 
                  name="email" 
                  type="text"
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6
                    focus:transition-transform 
                    focus:-translate-y-1
                    focus:ease-in-out
                    focus:duration-500
                    duration-500"
                  placeholder="you@email.com"
                  defaultValue={emailAddr}
                />
              </div>
              

              {/**Password Input */}
              <div className="flex flex-col self-stretch gap-1">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Password *
                </label>
                <input
                  onChange={onChange} 
                  name="password" 
                  type="password"
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6
                    focus:transition-transform 
                    focus:-translate-y-1
                    focus:ease-in-out
                    focus:duration-500
                    duration-500"
                  placeholder="*********"
                />
              </div>

              <div className="flex self-end px-1 text-indigo-500">
                <span
                  onClick={() => setUiState('signIn')}
                  role="button"
                >Have an account?</span>  
              </div>
              
              <button
                onClick={signUp}
                className={
                  `
                    flex justify-center items-center py-2 px-4 self-stretch
                    shadow-sm rounded-md bg-indigo-500
                    ${shake ? 'shake': ''}
                    hover:transition-transform
                    hover:-translate-y-1 
                    hover:ease-in-out
                    hover:duration-500
                    duration-500
                  `
                }
              >
                <p className="font-normal tracking-wider text-sm leading-5 text-white">Sign Up</p>
              </button>
              

            </div>

          </div>
          
          <div className="flex flex-col basis-1/2 justify-center items-center self-stretch">
            <img className="object-cover w-full h-full" src="/sign-in-split.png"></img>
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