export default function SidePanel({jdFiles, setMainPanelState, setCurrentJD}){
  return(
    <>
      {
        jdFiles.length > 0 ? (
          <>
            <div className='mt-4 mb-2 px-3 flex justify-between items-center'>
              <div className="ml-2 text-2xl font-semibold leading-6 text-gray-100">Jobs</div>
              <button className="rounded-full bg-blue-100 w-8" onClick={() => setMainPanelState('UploadJD')}>
                <svg fill="none" className='stroke-blue-600 p-1 hover:p-0' strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className="ml-2 text-lg font-semibold leading-6 text-blue-600">Jobs</div>
        )
      }
      {
        jdFiles.map((item, i)=>{
          return (
              <button
                className='
                  text-left
                  mx-2 my-1 py-2 px-4
                  bg-blue-100
                  text-blue-400
                  rounded-md
                  '
                key={i}
                onClick={() => {
                  setCurrentJD(item);
                  setMainPanelState('ResumeUploads');
                  }
                }
              >
                <div className='line-clamp-1 font-semibold tracking-wider' key={i}>{item}</div>
              </button>
          )  
        })
      }
    </>
  )
}