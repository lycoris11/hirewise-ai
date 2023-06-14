import dynamic from 'next/dynamic';
import NavBar from '../components/NavBar';
import LoginFlow from '../components/LoginFlow';


const Particle = dynamic(() => import("../components/Particle"), {
  ssr: false,
})

function Profile(){

  
  return(
    <>
      <NavBar></NavBar>
      <Particle/>
      <LoginFlow/>
    </>
  )

}

export default Profile
