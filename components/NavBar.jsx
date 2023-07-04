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
              <a className="text-2xl no-underline text-grey-darkest hover:text-gray-400">Hirewise A.I.</a>
            </Link>
          </div>
          
          <div>
            {
              state==='splash' && (
                <>
                  <button onClick={() => setUiState('signIn')}>
                    <a className='ml-4'>Sign In</a>
                  </button>
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