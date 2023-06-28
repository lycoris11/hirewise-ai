import UploadResume from "./UploadResume"


export default function ResumeUploads(
  {
    currentJD, 
    setResumeFileForm, 
    uploadResumeFileToS3, 
    aiOutput
  }){
    
    return (
      <>
        <div className="mt-12 px-16">
        <h1 className="font-bold text-4xl text-indigo-500">Match Candidates - {currentJD}</h1>
        <div className="mt-4 flex flex-col items-center justify-center w-full">
          <UploadResume
            setResumeFileForm={setResumeFileForm}
            uploadResumeFileToS3={uploadResumeFileToS3}
          />

          <button
            className="justify-left"
            type="submit"
            onClick={() => {
              uploadResumeFileToS3()
            }}
          >Get Results
          </button>
          <div>{aiOutput}</div>
        </div>
      </div>
      
      <>{/*
        <div className="mt-12 px-16">
          <h1 className="font-bold text-4xl text-indigo-500">Match Candidates - {currentJD}</h1>
          <div className="flex items-center justify-center w-full mt-4">
            <UploadResume
              setResumeFileForm={setResumeFileForm}
              uploadResumeFileToS3={uploadResumeFileToS3}
            />
          </div>
          <div className="mt-4 flex items-center justify-center w-full">
            <div>
              <button
                onClick={() => isGoodCandidateMatch()}
              >Submit
              </button>
            </div>
            <div><pre className="flex items center w-full text-2xl">{aiOutput}</pre></div>
          </div>
          
          </div>*/}
      </>
      </>
    )
}