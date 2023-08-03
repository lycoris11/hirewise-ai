import '../styles/globals.css'
import Head from 'next/head'



function MyApp({ Component, pageProps }) {
  
  return(
    <>
      <Head>
        <title>Hirewise A.I.</title>
        <meta name="description" content="Hirewise AI" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
      </Head>
    
      <Component {...pageProps}></Component>
    </>
  )
}

export default MyApp
