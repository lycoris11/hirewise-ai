import { Auth } from 'aws-amplify'
import Link from "next/link"

export default function NavBar({state, setUiState}){
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
              state==='splash' && (
                <>
                  <Link href='/profile'>
                    <a className='rounded-md px-3.5 py-2.5 text-sm font-semibold hover:bg-gray-100'>Sign In</a>
                  </Link>
                  <Link href='/protected'>
                    <a className='ml-2 rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100'>Sign Up</a>
                  </Link>
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
                  <Link href='/'>
                    <a className='ml-4'>Home</a>
                  </Link>
                </>
              )
            } 

            {state==='signUp' && (
                <>
                  <Link href='/'>
                    <a className='ml-4'>Return Home</a>
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