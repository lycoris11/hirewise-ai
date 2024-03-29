import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import '../configureAmplify'
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import ForgotPassword from "../components/ForgotPassword";
import ForgotPasswordSubmit from "../components/ForgotPasswordSubmit";
import ConfirmSignUp from "../components/ConfirmSignUp";
import NavBar from "./NavBar";
import { useRouter } from 'next/router';


export default function LoginFlow({isBeingRendered, component, emailAddr}){

  const[uiState, setUiState] = useState(null);
  const[formState, setFormState] = useState({email:'', password:'', authCode:''});
  const[shake, setShake] = useState(false);
  const[user, setUser] = useState(null);
  const {email, password, authCode} = formState;

  const router = useRouter();

  useEffect(() => {
    checkUser();
    emailAddr ? setFormState({...formState, email: emailAddr}) : setFormState({...formState, email: ''});
  }, []);

  async function checkUser(){
    try{
      setUiState('loading');
      const user = await Auth.currentAuthenticatedUser();
      console.log(user);
      setUser(user);
      //setUiState('signedIn');
      router.push('/protected')
    } catch(err){ 
      setUser(null);
      setUiState('signIn')
    };
  };

  function updateFormState(e){
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
      setAndRemoveShake();
    }
  }
  
  async function confirmSignUp(){
    try{
      await Auth.confirmSignUp(email, authCode);
      signIn();
    } catch(err){
      console.log({err}[0]);
      setAndRemoveShake();
    }
  }
  
  async function signIn(){
    try{
      await Auth.signIn(email, password);
      setUiState('signedIn')
      checkUser()
    } catch(err){
      console.log({err});
      setAndRemoveShake();
    }
  }

  function setAndRemoveShake(){
    setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 1000);
  }

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

  return(
    <>
    {
      !uiState || uiState === 'loading' ? (
        <></>
      ) : (
        <>
          {
            uiState === 'signUp' && (
              <>
                <NavBar state={"signUp"} setUiState={setUiState}></NavBar>
                <SignUp
                  onChange={updateFormState}
                  setUiState={setUiState}
                  signUp={signUp}
                  shake={shake}
                  emailAddr={emailAddr}
                />
              </>
            )
          }
          {
            uiState === 'confirmSignUp' && (
              <ConfirmSignUp
                onChange={updateFormState}
                setUiState={setUiState}
                confirmSignUp={confirmSignUp}
                isBeingRendered={isBeingRendered}
              />
            )
          }
          {
            uiState === 'signIn' && (
              <>
                <NavBar state={"signIn"}></NavBar>
                <SignIn
                  setUiState={setUiState}
                  onChange={updateFormState}
                  signIn={signIn}
                  shake={shake}
                  isBeingRendered={isBeingRendered}
                  component={component}
                />
              </>
            )
          }
          {
            (uiState === 'signedIn' && user) && (
              <div>
                <p className='text-xl text-white'>Welcome, {user.attributes.email}</p>
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
              <>
                <NavBar state={"forgotPassowrd"} setUiState={setUiState}></NavBar>
                <ForgotPassword
                  onChange={updateFormState}
                  setUiState={setUiState}
                  forgotPassword={forgotPassword}
                  isBeingRendered={isBeingRendered}
                />
              </>
            )
          }
          {
            uiState === 'forgotPasswordSubmit' && (
              <ForgotPasswordSubmit
                onChange={updateFormState}
                forgotPasswordSubmit={forgotPasswordSubmit}
              />
            )
          }
        </>
      )
    }
    
    </>
  )
}