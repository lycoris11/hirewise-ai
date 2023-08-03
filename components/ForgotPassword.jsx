import { EmailInput, ButtonSubmit } from "./Inputs";
import { useEffect } from "react";

export default function ForgotPassword({onChange, setUiState, forgotPassword, isBeingRendered}){

  useEffect(() => {
    isBeingRendered(true);

    return() => {
      isBeingRendered(false);
    }
  }, [isBeingRendered])

  return(
    <>

      <div className="flex flex-col h-75vh items-center justify-center pb-12 select-none">
        <div className="w-full sm:w-540 shadow-form backdrop-blur rounded-lg">

          <div className="gap-8">

            <div className="flex flex-col gap-6 items-center">
              <div>Logo</div>
              <p className="mt-4 text-gray-900 font-medium self-start px-10 text-4xl sm:text-3xl md:text-4xl sm:leading-tight md:leading-tight">Forgot Password?</p>
            </div>

            <div className="flex flex-col gap-6 py-8 px-10 items-center self-stretch">
            
              <div className="flex flex-col self-stretch gap-1">
                <EmailInput onChange={onChange}/>
              </div>

              <ButtonSubmit onClick={forgotPassword} text="Reset Password"/>

              <div className="flex self-end px-1 text-indigo-500">
                <span
                  onClick={() => setUiState('signIn')}
                  role="button"
                >Cancel</span>  
              </div>

            </div>
            
          </div>

        </div>
      </div>  
    </>
  )
}