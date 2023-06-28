import UploadResume from "./UploadResume"


export default function ResumeUploads(
  {
    currentJD, 
    setResumeFileForm, 
    uploadResumeFileToS3, 
    isGoodCandidateMatch, 
    aiOutput
  }){
    return (
      <>
        <div className="mt-12 px-16 overflow-auto">
          <h1>Match Job Descriptions Against Resumes</h1>
          <p>{currentJD}</p>
          <UploadResume
            setResumeFileForm={setResumeFileForm}
            uploadResumeFileToS3={uploadResumeFileToS3}
          />
          <div className="mt-4 flex items-center justify-center w-full">

            <button
              onClick={() => isGoodCandidateMatch()}
            >Submit
            </button>
          </div>
          <p>{aiOutput}</p>
        </div>
      </>
    )
}