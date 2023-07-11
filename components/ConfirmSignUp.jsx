import { Auth } from "aws-amplify";
import Input from "./Input";
import { useEffect } from "react";

export default function ConfirmSignUp({onChange, setUiState, confirmSignUp, shake, isBeingRendered}){

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
              <p className="mt-4 text-gray-900 font-medium self-start px-10 text-4xl sm:text-3xl md:text-4xl sm:leading-tight md:leading-tight">Confirm your account.</p>
            </div>

            <div className="flex flex-col gap-6 py-8 px-10 items-center self-stretch">
              
              <div className="flex flex-col self-stretch gap-1">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Token *
                </label>
                <input
                  onChange={onChange} 
                  name="authCode" 
                  type="text"
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6
                    focus:transition-transform 
                    focus:-translate-y-1
                    focus:ease-in-out
                    focus:duration-500
                    duration-500"
                  placeholder="1X2Y3Z"
                />
              </div>

              <button
                onClick={confirmSignUp}
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
                <p className="font-normal tracking-wider text-sm leading-5 text-white">Authenticate</p>
              </button>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}