import { useRef, useState } from 'react'
import NavBar from '../components/NavBar'
import Link from 'next/link'

export default function Home() {

  //const email = useRef('');
  const [email, setEmail] = useState('');

  return (
    <>
      <NavBar state={'splash'}></NavBar>
      
      

      <div className='flex py-32 px-20 justify-center self-stretch bg-gradient-to-b from-purple-100 to-white'>
        <div className='flex w-full px-8 gap-12 items-center'>
          <div className='flex py-24 flex-col justify-center items-start gap-12'>
            <div className='flex flex-col px-24 items-start gap-6 self-stretch'>
              <div className='flex flex-col items-start gap-5'>
                <div className='flex-flex-col self-stretch text-gray-900 text-6xl leading-none font-extrabold tracking-tight'>
                  Find your perfect match with AI-powered candidate recommendations.
                </div>
                <div className='flex flex-col self-stretch text-xl leading-7 font-normal text-gray-700'>
                  Say goodbye to the hassle of sifting through piles of resumes. Our AI-powered recommendation system streamlines the process, helping you find the perfect candidate for the job.
                </div>
              </div>

              <div className='flex w-[576px] items-start gap-4'>
                
                  <input
                    onChange={(e) => {setEmail(e.target.value)}}
                    type="email"
                    name="email"
                    id="email"
                    className="flex items-center w-2/3 rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Enter your email"
                  />
                
                <div className='flex w-auto items-start gap-3 self-start'>
                  <Link href={{
                    pathname: "/profile",
                    query: {
                      component:'signUp',
                      email:email
                    }
                  }}>
                    <button className='flex  py-3 px-4 items-center rounded-md text-white text-opacity-100 bg-indigo-500 hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'>Sign Up</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-center items-start gap-12 w-full h-full'>
            <svg className='w-[90%] h-[90%]' viewBox="0 0 626 624" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_61_2646)">
                <path className="animated-path" opacity="0.07" d="M568.081 263.018C568.081 266.406 568.006 269.794 567.781 272.957C600.135 297.58 625.04 350.364 625.04 396.823C625.04 447.424 595.47 471.293 558.977 450.21C558.902 450.134 558.826 450.134 558.751 450.06L329.488 317.76C329.412 317.684 329.337 317.684 329.186 317.609C288.179 293.89 254.922 228.606 254.922 171.756C254.922 118.519 284.115 91.4873 321.512 107.827C326.101 71.3072 350.555 55.5698 380.05 72.6626C394.196 80.8702 407.213 95.2522 417.371 112.571C432.118 90.659 457.249 85.0869 485.69 101.502C531.212 127.706 568.081 200.068 568.081 263.018Z" fill="url(#paint0_linear_61_2646)"/>
                <path className="animated-path" opacity="0.4" d="M530.46 299.161C530.46 302.549 530.385 305.938 530.16 309.1C562.514 333.723 587.419 386.507 587.419 432.967C587.419 483.567 557.849 507.437 521.356 486.354C521.281 486.279 521.205 486.279 521.13 486.203L291.867 353.903C291.792 353.828 291.716 353.828 291.565 353.752C250.558 330.033 217.301 264.749 217.301 207.899C217.301 154.663 246.496 127.63 283.891 143.971C288.48 107.45 312.934 91.7133 342.429 108.806C356.575 117.014 369.592 131.395 379.75 148.714C394.497 126.803 419.629 121.23 448.07 137.646C493.592 163.849 530.46 236.212 530.46 299.161Z" fill="url(#paint1_linear_61_2646)"/>
                <path className="animated-path" opacity="0.2" d="M167.49 363.617L132.578 343.437V331.615L167.49 351.795C170.35 353.452 174.488 356.765 178.024 361.885C181.862 367.382 184.57 374.309 184.57 381.839C184.57 390.123 182.464 394.866 178.401 396.221C174.638 397.501 170.199 395.317 167.415 393.737L153.043 385.454L152.968 385.378C151.764 384.625 149.808 383.948 148.228 384.399C146.949 384.776 145.519 386.056 145.519 390.649C145.519 395.242 146.949 398.104 148.153 399.76C149.658 401.868 151.614 403.374 152.818 403.977L152.968 404.052L196.835 429.428V441.25L153.194 416.025C150.184 414.444 145.895 411.131 142.134 405.86C138.07 400.137 135.211 392.833 135.286 384.701C135.286 376.644 138.07 372.502 142.134 371.372C145.895 370.319 150.184 371.825 153.194 373.707L167.415 381.915C169.446 383.119 171.027 383.646 172.005 383.27C172.757 383.044 174.262 381.915 174.262 375.891C174.262 372.05 172.983 369.49 171.855 367.758C170.5 365.801 168.619 364.295 167.49 363.617Z" fill="black"/>
                <path className="animated-path" d="M140.103 340.5C140.103 350.213 134.384 354.807 127.386 350.815C120.388 346.75 114.67 335.605 114.67 325.817C114.67 316.103 120.388 311.51 127.386 315.501C134.384 319.567 140.103 330.786 140.103 340.5Z" fill="url(#paint2_linear_61_2646)"/>
                <path className="animated-path" d="M214.593 445.165C214.593 454.879 208.874 459.472 201.876 455.481C194.878 451.415 189.16 440.271 189.16 430.482C189.16 420.768 194.878 416.175 201.876 420.166C208.874 424.232 214.593 435.452 214.593 445.165Z" fill="url(#paint3_linear_61_2646)"/>
                <path className="animated-path" opacity="0.07" d="M274.711 195.022L500.363 325.365V444.864L274.635 314.522L274.711 195.022Z" fill="url(#paint4_linear_61_2646)"/>
                <path className="animated-path" opacity="0.3" d="M244.538 210.083L470.19 340.425V459.924L244.538 329.582V210.083Z" fill="url(#paint5_linear_61_2646)"/>
                <path className="animated-path" d="M264.778 281.241C264.778 290.878 270.496 301.948 277.494 306.014C284.491 310.08 290.21 305.562 290.21 295.923C290.21 286.286 284.491 275.217 277.494 271.151C270.496 267.084 264.778 271.602 264.778 281.241Z" fill="url(#paint6_linear_61_2646)"/>
                <path className="animated-path" opacity="0.15" d="M296.607 299.839C296.607 304.282 299.24 309.478 302.552 311.361C305.787 313.243 308.42 311.135 308.42 306.692C308.42 302.249 305.787 297.053 302.476 295.171C299.24 293.289 296.607 295.397 296.607 299.839Z" fill="black"/>
                <path className="animated-path" opacity="0.15" d="M314.74 310.306C314.74 314.748 317.374 319.944 320.684 321.826C323.919 323.709 326.554 321.601 326.554 317.158C326.554 312.716 323.919 307.52 320.609 305.638C317.374 303.755 314.74 305.863 314.74 310.306Z" fill="black"/>
                <path className="animated-path" opacity="0.15" d="M413.232 330.636V398.631L404.353 393.511V325.516L413.232 330.636Z" fill="black"/>
                <path className="animated-path" opacity="0.15" d="M432.644 341.932V409.926L423.766 404.806V336.811L432.644 341.932Z" fill="black"/>
                <path className="animated-path" opacity="0.15" d="M452.132 353.225V421.221L443.253 416.1V348.105L452.132 353.225Z" fill="black"/>
                <path className="animated-path" opacity="0.07" d="M274.635 358.346L500.288 488.688V608.187L274.635 477.845V358.346Z" fill="url(#paint7_linear_61_2646)"/>
                <path className="animated-path" opacity="0.3" d="M244.538 374.159L470.19 504.501V624L244.538 493.658V374.159Z" fill="url(#paint8_linear_61_2646)"/>
                <path className="animated-path" d="M264.778 445.316C264.778 454.955 270.496 466.023 277.494 470.09C284.491 474.156 290.21 469.637 290.21 460C290.21 450.361 284.491 439.292 277.494 435.227C270.496 431.16 264.778 435.678 264.778 445.316Z" fill="url(#paint9_linear_61_2646)"/>
                <path className="animated-path" opacity="0.15" d="M296.607 463.991C296.607 468.433 299.24 473.628 302.552 475.511C305.787 477.393 308.42 475.285 308.42 470.842C308.42 466.399 305.787 461.205 302.476 459.322C299.24 457.44 296.607 459.472 296.607 463.991Z" fill="black"/>
                <path className="animated-path" opacity="0.15" d="M314.665 474.456C314.665 478.899 317.299 484.095 320.609 485.977C323.845 487.859 326.478 485.751 326.478 481.309C326.478 476.866 323.845 471.671 320.534 469.787C317.299 467.83 314.665 469.938 314.665 474.456Z" fill="black"/>
                <path className="animated-path" opacity="0.15" d="M413.232 497.046V565.041L404.353 559.92V491.926L413.232 497.046Z" fill="black"/>
                <path className="animated-path" opacity="0.15" d="M432.644 508.342V576.336L423.766 571.216V503.221L432.644 508.342Z" fill="black"/>
                <path className="animated-path" opacity="0.15" d="M452.132 519.636V587.63L443.253 582.51V514.516L452.132 519.636Z" fill="black"/>
                <path className="animated-path" opacity="0.3" d="M44.1676 33.0557L184.796 114.303V375.062L44.1676 293.739V33.0557Z" fill="url(#paint10_linear_61_2646)"/>
                <path className="animated-path" d="M130.997 127.481C130.997 140.508 123.473 146.682 114.218 141.261C104.963 135.839 97.4391 120.93 97.4391 107.904C97.4391 94.8767 104.963 88.7022 114.218 94.1237C123.473 99.5452 130.997 114.455 130.997 127.481Z" fill="url(#paint11_linear_61_2646)"/>
                <path className="animated-path" d="M114.218 151.727C99.2444 142.993 86.9046 151.199 84.7226 170.024C84.3465 173.262 86.8294 177.63 89.8391 179.361L138.671 207.9C141.681 209.632 144.165 208.277 143.788 204.511C141.53 183.051 129.116 160.462 114.218 151.727Z" fill="url(#paint12_linear_61_2646)"/>
                <path className="animated-path" opacity="0.15" d="M72.3835 202.177L156.204 250.594V260.834L72.3835 212.418V202.177Z" fill="black"/>
                <path className="animated-path" opacity="0.15" d="M80.8865 227.402L147.325 265.729V275.969L80.8865 237.642V227.402Z" fill="black"/>
                <path className="animated-path" d="M97.8153 270.473L0 213.924V243.065L97.8153 299.614V270.473Z" fill="url(#paint13_linear_61_2646)"/>
                <path className="animated-path" opacity="0.2" d="M215.119 0L236.036 41.1131C238.895 46.7605 238.444 52.4079 234.983 53.7632C231.522 55.1187 226.406 51.5795 223.546 45.9322L223.32 45.4051V91.0361C223.32 96.2317 219.709 98.34 215.195 95.7798C210.68 93.1444 207.068 86.8946 207.068 81.6991V36.068L206.843 36.2939C203.984 38.6282 198.792 36.2186 195.406 30.8724C191.945 25.5263 191.493 19.3518 194.352 17.0175L215.119 0Z" fill="url(#paint14_linear_61_2646)"/>
                <path className="animated-path" opacity="0.2" d="M215.119 607.057L194.202 565.944C191.342 560.297 191.794 554.65 195.255 553.295C198.716 551.939 203.833 555.478 206.692 561.126L206.917 561.652V516.021C206.917 510.826 210.529 508.717 215.044 511.278C219.559 513.913 223.171 520.163 223.171 525.358V570.989L223.396 570.763C226.255 568.43 231.447 570.839 234.833 576.185C238.294 581.532 238.746 587.706 235.887 590.04L215.119 607.057Z" fill="url(#paint15_linear_61_2646)"/>
              </g>
              <defs>
                <linearGradient id="paint0_linear_61_2646" x1="611.58" y1="119.223" x2="378.594" y2="340.05" gradientUnits="userSpaceOnUse">
                <stop stopColor="black"/>
                <stop offset="1" stopColor="black" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="paint1_linear_61_2646" x1="573.951" y1="155.367" x2="340.966" y2="376.195" gradientUnits="userSpaceOnUse">
                <stop stopColor="black"/>
                <stop offset="1" stopColor="black" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="paint2_linear_61_2646" x1="140.103" y1="333.388" x2="114.67" y2="333.388" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818CF8"/>
                <stop offset="1" stopColor="#818CF8"/>
                </linearGradient>
                <linearGradient id="paint3_linear_61_2646" x1="214.593" y1="438.054" x2="189.16" y2="438.054" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818CF8"/>
                <stop offset="1" stopColor="#818CF8"/>
                </linearGradient>
                <linearGradient id="paint4_linear_61_2646" x1="382.886" y1="204.579" x2="391.306" y2="415.956" gradientUnits="userSpaceOnUse">
                <stop stopColor="black"/>
                <stop offset="1" stopColor="black" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="paint5_linear_61_2646" x1="352.788" y1="219.639" x2="361.208" y2="431.015" gradientUnits="userSpaceOnUse">
                <stop stopColor="black"/>
                <stop offset="1" stopColor="black" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="paint6_linear_61_2646" x1="290.21" y1="288.81" x2="264.778" y2="288.81" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818CF8"/>
                <stop offset="1" stopColor="#818CF8"/>
                </linearGradient>
                <linearGradient id="paint7_linear_61_2646" x1="382.87" y1="367.927" x2="391.29" y2="579.304" gradientUnits="userSpaceOnUse">
                <stop stopColor="black"/>
                <stop offset="1" stopColor="black" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="paint8_linear_61_2646" x1="352.772" y1="383.741" x2="361.192" y2="595.117" gradientUnits="userSpaceOnUse">
                <stop stopColor="black"/>
                <stop offset="1" stopColor="black" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="paint9_linear_61_2646" x1="290.21" y1="452.886" x2="264.778" y2="452.886" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818CF8"/>
                <stop offset="1" stopColor="#818CF8"/>
                </linearGradient>
                <linearGradient id="paint10_linear_61_2646" x1="199.867" y1="55.9731" x2="74.8925" y2="272.331" gradientUnits="userSpaceOnUse">
                <stop stopColor="black"/>
                <stop offset="1" stopColor="black" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="paint11_linear_61_2646" x1="130.997" y1="118" x2="97.4391" y2="118" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818CF8"/>
                <stop offset="1" stopColor="#818CF8"/>
                </linearGradient>
                <linearGradient id="paint12_linear_61_2646" x1="143.826" y1="178.802" x2="84.6848" y2="178.802" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818CF8"/>
                <stop offset="1" stopColor="#818CF8"/>
                </linearGradient>
                <linearGradient id="paint13_linear_61_2646" x1="97.8153" y1="257.285" x2="0" y2="257.285" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818CF8"/>
                <stop offset="1" stopColor="#818CF8"/>
                </linearGradient>
                <linearGradient id="paint14_linear_61_2646" x1="230.004" y1="41.4715" x2="191.827" y2="62.7373" gradientUnits="userSpaceOnUse">
                <stop stopColor="black"/>
                <stop offset="1" stopColor="whiblackte" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="paint15_linear_61_2646" x1="200.194" y1="565.614" x2="238.371" y2="544.349" gradientUnits="userSpaceOnUse">
                <stop stopColor="black"/>
                <stop offset="1" stopColor="black" stopOpacity="0"/>
                </linearGradient>
                <clipPath id="clip0_61_2646">
                <rect width="625.04" height="624" fill="black"/>
                </clipPath>
              </defs>
            </svg>

          </div>
        </div>
      </div>
      <div className='flex justify-centeritems-center'>
        <div className='flex w-full py-24 px-24 sm:px-28 md:px-36 lg:px-42 xl:px-52 2xl:px-72 items-center'>
          <h1 className=' text-[24px] sm:text-[30px] md:text-[36px] lg:text-[48px] font-normal sm:font-normal leading-relaxed sm:leading-relaxed'>
              <span className="bg-[rgba(107,64,216,0.15)] ">Super</span>
              <span className="bg-[rgba(104,222,122,.2)] ">charge</span>
              <span className="bg-[rgba(244,172,54,.2)] "> your</span>
              <span className="bg-[rgba(239,65,70,.2)] "> recruitment</span>
              <span className="bg-[rgba(39,181,234,.2)] "> process</span>
              <span className="bg-[rgba(107,64,216,0.15)]">.</span><br/>
              <span className="bg-[rgba(244,172,54,0.2)]">H</span>
              <span className="bg-[rgba(239,65,70,0.2)]">ire</span>
              <span className="bg-[rgba(39,181,234,0.2)]">wise</span>
              <span className="bg-[rgba(107,64,216,0.15)]"> A</span>
              <span className="bg-[rgba(104,222,122,0.2)]">.</span>
              <span className="bg-[rgba(244,172,54,0.2)]">I</span>
              <span className="bg-[rgba(239,65,70,0.2)]">.</span>
              <span className="bg-[rgba(39,181,234,0.2)]"> harness</span>
              <span className="bg-[rgba(107,64,216,0.15)]">es</span>
              <span className="bg-[rgba(104,222,122,0.2)]"> the</span>
              <span className="bg-[rgba(244,172,54,0.2)]"> potential</span>
              <span className="bg-[rgba(239,65,70,0.2)]"> of</span>
              <span className="bg-[rgba(39,181,234,0.2)]"> Gener</span>
              <span className="bg-[rgba(107,64,216,0.15)]">ative</span>
              <span className="bg-[rgba(104,222,122,0.2)]"> AI</span>
              <span className="bg-[rgba(244,172,54,0.2)]"> and</span>
              <span className="bg-[rgba(239,65,70,0.2)]"> Large</span>
              <span className="bg-[rgba(39,181,234,0.2)]"> Language</span>
              <span className="bg-[rgba(107,64,216,0.15)]"> Models</span>
              <span className="bg-[rgba(104,222,122,0.2)]">,</span>
              <span className="bg-[rgba(244,172,54,0.2)]"> powered</span>
              <span className="bg-[rgba(239,65,70,0.2)]"> by</span>
              <span className="bg-[rgba(39,181,234,0.2)]"> G</span>
              <span className="bg-[rgba(107,64,216,0.15)]">PT</span>
              <span className="bg-[rgba(104,222,122,0.2)]">-</span>
              <span className="bg-[rgba(244,172,54,0.2)]">3</span>
              <span className="bg-[rgba(239,65,70,0.2)]">.</span>
              <span className="bg-[rgba(39,181,234,0.2)]">5</span>
              <span className="bg-[rgba(107,64,216,0.15)]">,</span>
              <span className="bg-[rgba(104,222,122,0.2)]"> to</span><br/>
              <span className="bg-[rgba(239,65,70,0.2)]">eff</span>
              <span className="bg-[rgba(39,181,234,0.2)]">ort</span>
              <span className="bg-[rgba(107,64,216,0.15)]">lessly</span>
              <span className="bg-[rgba(104,222,122,0.2)]"> compare</span>
              <span className="bg-[rgba(244,172,54,0.2)]"> resumes</span>
              <span className="bg-[rgba(239,65,70,0.2)]"> and</span>
              <span className="bg-[rgba(39,181,234,0.2)]"> job</span>
              <span className="bg-[rgba(107,64,216,0.15)]"> descriptions</span>
              <span className="bg-[rgba(104,222,122,0.2)]">.</span><br/>
              <span className="bg-[rgba(239,65,70,0.2)]">Red</span>
              <span className="bg-[rgba(39,181,234,0.2)]">uce</span>
              <span className="bg-[rgba(107,64,216,0.15)]"> time</span>
              <span className="bg-[rgba(104,222,122,0.2)]">-</span>
              <span className="bg-[rgba(244,172,54,0.2)]">to</span>
              <span className="bg-[rgba(239,65,70,0.2)]">-</span>
              <span className="bg-[rgba(39,181,234,0.2)]">hire</span>
              <span className="bg-[rgba(107,64,216,0.15)]"> and</span>
              <span className="bg-[rgba(104,222,122,0.2)]"> get</span>
              <span className="bg-[rgba(244,172,54,0.2)]"> more</span>
              <span className="bg-[rgba(239,65,70,0.2)]"> commissions</span>
              <span className="bg-[rgba(39,181,234,0.2)]">!</span>
          </h1>
        </div>
      </div>
      
      {/*
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-100">
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
    */}
    </>
  )
}
