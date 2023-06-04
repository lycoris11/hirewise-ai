import '../styles/globals.css'
import { Input } from '@nextui-org/react';
import { Navbar } from "@nextui-org/react";
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  //return <Component {...pageProps} />
  return(
    <div>
      <nav className='py-4 px-12 border-b border-gray-300'>
        <Link href='/'>
          <a>Home</a>
        </Link>

        <Link href='/profile'>
          <a className='ml-4'>Sign In</a>
        </Link>

        <Link href='/protected'>
          <a className='ml-4'>Protect</a>
        </Link>
      </nav>
      <Component {...pageProps}></Component>
    </div>
  )
}

export default MyApp
