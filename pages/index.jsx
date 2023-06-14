import NavBar from '../components/NavBar'

export default function Home() {
  return (
    <>
      <NavBar></NavBar>
      
      <div className="min-h-screen bg-repeat-round">
          <div className="flex flex-col items-center">
            <div className="max-w-2/3 sm:w-2/3 mt-16">
              <header className='pt-24'>
                <h1 className='sm:text-4xl md:text-5xl lg:text-6xl w-2/3 font-semibold md:leading-snug lg:leading-tight'>Find your perfect match with AI-powered candidate recommendations.</h1>
                <h2 className='pt-12 text-3xl font-medium leading-tight'>Say goodbye to the hassle of sifting through piles of resumes. Our AI-powered recommendation system streamlines the process, helping you find the perfect candidate for the job.</h2>
                <div>
                  
                </div>
              </header>
              <main className='pt-16'>
                <p>Our platform is designed to make the hiring process easy and efficient.</p>
                <ul>
                  <li>Save time by eliminating the need for manual resume screening</li>
                  <li>Find the best candidates faster, reducing time-to-hire</li>
                  <li>Make more informed hiring decisions, increasing the chances of finding the right fit</li>
                </ul>

                <p>Sign up today and experience the power of AI-driven recruiting for yourself.</p>
              </main>
            </div>
          </div>
      </div>
      

      <footer>
        <a href="link-to-signup-page" className="cta-button">Get started today</a>
      </footer>

    </>
  )
}
