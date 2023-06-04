import { Auth } from "aws-amplify";
import Input from "./Input";

export default function ForgotPassword({onChange, setUiState, forgotPassword}){

    return(
      <>
        <p className="font-semibold text-[38px] md:text-[48px] leading-tight">Forgot Password?</p>
  
        <div className="mt-10">
          <label className="text-sm">Email</label>
          <Input onChange={onChange} name='email'/>
        </div>
  
  
        <button className="text-white w-full mt-6 bg-pink-600 p-3 rounded"
          onClick={forgotPassword}
        >Reset Password
        </button>

        <button className="text-sm mt-6 text-pink-500"
          onClick={() => setUiState('signIn')}
        >Cancel
        </button>
      </>
    )
  }