import Input from "./Inputs";
import { PasswordInput } from "./Inputs";

export default function ForgotPasswordSubmit({onChange, setUiState, forgotPasswordSubmit}){

    return(
      <>
        <p className="font-semibold text-[38px] md:text-[48px] leading-tight">Confirm new password?</p>
  
        <div className="mt-10">
          <label className="text-sm">Confirmation Code</label>
          <Input onChange={onChange} name='authCode'/>
        </div>
        
        <div className="mt-10">
          <label className="text-sm">New Password</label>
          <PasswordInput onChange={onChange}/>
          {/*<Input onChange={onChange} name='password' type='password'/>*/}
        </div>
  
        <button className="text-white w-full mt-6 bg-pink-600 p-3 rounded"
          onClick={forgotPasswordSubmit}
        >Submit New Password
        </button>
      </>
    )
  }