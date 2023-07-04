import { Auth } from "aws-amplify";
import SocialSignIn from './SocialSignIn'
import Input from "./Input";
import { useEffect } from "react";

export default function SignIn({onChange, setUiState, signIn, shake, isBeingRendered}){

  useEffect(() => {
    isBeingRendered(true);

    return() => {
      isBeingRendered(false);
    }
  }, [isBeingRendered])

  return(
    <>
      <div className="flex flex-col h-screen items-center justify-center pb-12 select-none">
        <div className="w-full sm:w-540 shadow-form backdrop-blur rounded-lg">
          
          <div className="gap-8">
            
            <div className="flex flex-col gap-6 items-center">
              <div>Logo</div>
              <p className="mt-4 text-gray-900 font-medium self-start px-10 text-4xl sm:text-3xl md:text-4xl sm:leading-tight md:leading-tight">Welcome back,<br/>sign in to continue.</p>

              <p className="mt-4 self-start px-10 text-sm font-medium text-gray-900">Don&apos;t have an account?
                <span className="cursor-pointer text-indigo-500 underline ml-2 underline-offset-2"
                  onClick={() => setUiState('signUp')}
                  role="button"
                >Create one now.</span>
              </p>
            </div>

            <div className="flex flex-col gap-6 py-8 px-10 items-center self-stretch">
              
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
                  placeholder="you@example.com"
                />
              </div>

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
                  placeholder="password"
                />
              </div>

              <div className="flex self-end px-1 text-indigo-500">
                <span
                  onClick={() => setUiState('forgotPassword')}
                  role="button"
                >Password help?</span>  
              </div>

              <button
                onClick={signIn}
                className={
                  `
                    flex justify-center items-center py-2 px-4 self-stretch
                    shadow-sm rounded-md bg-indigo-500
                    ${shake ? 'shake': ''}
                    hover:transition-transform
                    hover:scale-x-105
                    hover:-translate-y-1 
                    hover:ease-in-out
                    hover:duration-500
                    duration-500
                  `
                }
              >
                <p className="font-normal tracking-wider text-sm leading-5 text-white">Sign In</p>
              </button>

              <div className="flex justify-center items-center gap-2 self-stretch">
                <hr className="h-px flex-grow flex-shrink-0 basis-0" />
                <span className="text-sm text-gray-900">Or continue with</span>
                <hr className="h-px flex-grow flex-shrink-0 basis-0" />
              </div>
              
              <SocialSignIn/>
              

            </div>

          </div>

        </div>
      </div>
    </>
  )
}