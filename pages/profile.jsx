import dynamic from 'next/dynamic';
import NavBar from '../components/NavBar';
import LoginFlow from '../components/LoginFlow';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Particle = dynamic(() => import("../components/Particle"), {
  ssr: false,
});

function Profile(){
  
  const [renderParticles, setRenderParticles] = useState('false');

  const router = useRouter();

  const options={
    "fullScreen": false,
    "particles": {
      "number": {
        "value": 50,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#000000"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 2,
          "color": "#fff"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#000000",
        "opacity": 0.4,
        "width": 2
      },
      "move": {
        "enable": true,
        "speed": 0.2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "attract",
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "attract": { distance: 100, duration: 0.4, factor: 2 },
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 50,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 3
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  }

  const handleSignInRender = (isRendered) => {
    setRenderParticles(isRendered);
  }

  return(
    <>
      {
        renderParticles && (<Particle options={options}/>)
      }
      <LoginFlow isBeingRendered={handleSignInRender} component={router.query.component} emailAddr={router.query.email}/>
    </>
  )

}

export default Profile
