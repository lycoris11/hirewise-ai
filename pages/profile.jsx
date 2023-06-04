import dynamic from 'next/dynamic';
import LoginFlow from '../components/LoginFlow';


const Particle = dynamic(() => import("../components/Particle"), {
  ssr: false,
})

function Profile(){

  
  return(
    <>
      <Particle/>
      <LoginFlow/>
    </>
  )

}

export default Profile
