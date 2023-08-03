import { Auth } from "aws-amplify";
import SocialSignIn from './SocialSignIn'
import {EmailInput, PasswordInput, ButtonSubmit} from "./Inputs";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function SignIn({onChange, setUiState, signIn, shake, isBeingRendered, component}){

  const router = useRouter();

  useEffect(() => {

    if (component == 'signUp'){
      setUiState('signUp')
    }

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
              
              {/**Email Input */}
              <div className="flex flex-col self-stretch gap-1">
                <EmailInput onChange={onChange}/>
              </div>

              <div className="flex flex-col self-stretch gap-1">
                <PasswordInput onChange={onChange}/>
              </div>

              <div className="flex self-end px-1 text-indigo-500">
                <span
                  onClick={() => setUiState('forgotPassword')}
                  role="button"
                >Password help?</span>  
              </div>

              <ButtonSubmit onClick={signIn} shake={shake} text="Sign In"/>

              <div className="flex justify-center items-center gap-2 self-stretch">
                <hr className="h-px flex-grow flex-shrink-0 basis-0" />
                <span className="text-sm text-gray-900">Or continue with</span>
                <hr className="h-px flex-grow flex-shrink-0 basis-0" />
              </div>
              
              <SocialSignIn setUiState={setUiState}/>
              
            </div>

          </div>

        </div>
      </div>
    </>
  )
}