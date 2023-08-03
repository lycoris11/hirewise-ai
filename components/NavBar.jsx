import { Auth } from "aws-amplify";
import Link from "next/link"
import { useState, useEffect } from 'react';

export default function NavBar({state, setUiState}){

  const[signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);


  async function checkUser(){
    try{
      await Auth.currentAuthenticatedUser();
      setSignedIn(true);
    } catch(err){ 
      setSignedIn(false)
    };
  };

  return(
    <>
      <nav className='
        w-full
        py-4 px-6 
        flex flex-col 
        text-center 
        sm:flex-row sm:text-left sm:justify-between sm:items-baseline
        bg-white 
        shadow  
        '>
          <div className="mb-2 sm:mb-0">
            <Link href='/'>
              <a className="px-3 text-2xl no-underline text-grey-darkest hover:text-gray-400">Hirewise A.I.</a>
            </Link>
          </div>
          
          <div>
            {
              (state==='splash' && signedIn == false) && (
                <>
                  <Link href='/profile'>
                    <a className='rounded-md px-3.5 py-2.5 text-sm font-semibold hover:bg-gray-200'>Dashboard</a>
                  </Link>
                  <Link href="/profile?component=signUp">
                    <a className='ml-2 rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100'>Sign Up</a>
                  </Link>
                </>
              )
            }

            {
              (state==='splash' && signedIn == true) && (
                <>
                  <Link href='/profile'>
                    <a className='rounded-md px-3.5 py-2.5 text-sm font-semibold hover:bg-gray-200'>Dashboard</a>
                  </Link>
                  
                  <a 
                    onClick = {() => {
                      Auth.signOut();
                      }}
                    className='ml-2 rounded-md bg-red-50 px-3.5 py-2.5 text-sm font-semibold text-red-600 shadow-sm hover:cursor-pointer hover:bg-red-100'
                  >Sign Out</a>
                </>
              )
            }

            {
              state==='protected' && (
                <>
                  <a
                    onClick = {() => {
                    Auth.signOut();
                    }}
                    className='ml-4 cursor-pointer'
                  >Sign Out
                  </a>
                </>
              )
            }

            {state==='signIn' && (
                <>
                  
                </>
              )
            } 

            {state==='signUp' && (
                <>
                  <Link href='/profile'>
                    <a className='rounded-md px-3.5 py-2.5 text-sm font-semibold hover:bg-gray-100'>Home</a>
                  </Link>
                </>
              )
            }

            {
              state==='forgotPassowrd' && (
                <>
                  <button onClick={() => setUiState('signIn')}>
                    <a className='ml-4'>Sign In</a>
                  </button>
                </>
              )
            }
          </div>
      </nav>
    </>
  )
}