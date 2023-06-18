import { Auth } from 'aws-amplify'
import Link from "next/link"

export default function NavBar({state}){
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
            {state==='protected' ? (
              <>
                <a
                  onClick = {() => {
                  Auth.signOut();
                  }}
                  className='ml-4 cursor-pointer'
                >Sign Out
                </a>
              </>
            ) : (
              <>
                <Link href='/protected'>
                  <a className='ml-4'>Protect</a>
                </Link>

                <Link href='/profile'>
                  <a className='ml-4'>Sign In</a>
                </Link>    
              </>
            )}  
          </div>
      </nav>
    </>
  )
}