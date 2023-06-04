import { useState, useEffect, useCallback } from "react";
import { Auth } from "aws-amplify";
import '../configureAmplify'
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import ForgotPassword from "../components/ForgotPassword";
import ForgotPasswordSubmit from "../components/ForgotPasswordSubmit";
import ConfirmSignUp from "../components/ConfirmSignUp";
import dynamic from 'next/dynamic';


const Particle = dynamic(() => import("../components/Particle"), {
  ssr: false,
})

function Profile(){

  const[uiState, setUiState] = useState(null);
  const[formState, setFormState] = useState({email:'', password:'', authCode:''});
  const[shake, setShake] = useState(false);
  const[user, setUser] = useState(null);
  const {email, password, authCode} = formState;

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser(){
    try{
      setUiState('loading');
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
      setUiState('signedIn');
    } catch(err){ 
      setUser(null);
      setUiState('signIn');
    };
  };

  function onChange(e){
    setFormState({...formState, [e.target.name]: e.target.value});
  }

  async function signUp(){
    try{
      await Auth.signUp({
        username:email, password, attributes: { email }
      });
      setUiState('confirmSignUp');
    } catch(err){
      console.log({err});
    }
  }
  
  async function confirmSignUp(){
    try{
      await Auth.confirmSignUp(email, authCode);
      setUiState('signedIn');
      signIn();
    } catch(err){
      console.log({err})
    }
  }

  async function signIn(){
    try{
      await Auth.signIn(email, password);
      setUiState('signedIn')
      checkUser()
    } catch(err){
      console.log({err});
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 1000);
    }
  }

  /*use reducer */

  async function forgotPassword(){
    try{
      await Auth.forgotPassword(email);
      setUiState('forgotPasswordSubmit');
    } catch(err){
      console.log({err});
    }
  }

  async function forgotPasswordSubmit(){
    try{
      await Auth.forgotPasswordSubmit(email, authCode, password)
      setUiState('signIn')
    } catch(err){
      console.log({err})
    }
  }
  /*bg-[url('../public/dalle-background-opaque-cropped.png')] */
  return(
    <>
    <Particle/>
    <LoginFlow/>
    <div className=" select-none min-h-screen bg-repeat-round overflow: hidden;">
      <div className="flex flex-col items-center signInForm">
        <div className="max-w-full sm:w-540 mt-16">
          <div className="backdrop-invert backdrop-blur py-16 px-16 shadow-form rounded-lg">
            {
              !uiState || uiState === 'loading' && <p className="font-bold">Loading ...</p>
            }
            {
              uiState === 'signUp' && (
                <SignUp
                  onChange={onChange}
                  setUiState={setUiState}
                  signUp={signUp}
                />
              )
            }
            {
              uiState === 'confirmSignUp' && (
                <ConfirmSignUp
                  onChange={onChange}
                  setUiState={setUiState}
                  confirmSignUp={confirmSignUp}
                />
              )
            }
            {
              uiState === 'signIn' && (
                <SignIn
                  setUiState={setUiState}
                  onChange={onChange}
                  signIn={signIn}
                  shake={shake}
                />
              )
            }
            {
              (uiState === 'signedIn' && user) && (
                <div>
                  <p className='text-xl'>Welcome, {user.attributes.email}</p>
                  <button className="text-white w-full mt-10 bg-pink-600 p-3 rounded"
                    onClick = {() => {
                      Auth.signOut();
                      setUiState('signIn');
                      setUser(null);
                    }}
                  >Sign Out
                  </button>
                </div>
              )
            }
            {
              uiState === 'forgotPassword' && (
                <ForgotPassword
                  onChange={onChange}
                  setUiState={setUiState}
                  forgotPassword={forgotPassword}
                />
              )
            }
            {
              uiState === 'forgotPasswordSubmit' && (
                <ForgotPasswordSubmit
                  onChange={onChange}
                  forgotPasswordSubmit={forgotPasswordSubmit}
                />
              )
            }
          </div>
        </div>
      </div>
    </div>
    </>
  )

}

export default Profile
