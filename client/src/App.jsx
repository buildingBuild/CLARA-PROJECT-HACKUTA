import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import brandLogo from './assets/C.L.A.R.A.svg'
import Starfield from 'react-starfield';

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="container">
        
<div className="header-bar">
<div className='logo'>
<img src={brandLogo}></img>
</div>
  <p>About us</p>
  <p>How it works</p>
  <button>Sign Up</button> 
</div>

<hr></hr>
  <Starfield
            starCount={1000}
            starColor={[255, 255, 255]}
            speedFactor={0.05}
            backgroundColor="black"
          />
<div className='action-box'>
<div className="title-brand">
  <h1>C.L.A.R.A</h1>
  <h3>Comforting Lullabies And Restful Atmosphere</h3>

  <h4>How are you feeling today</h4>
  <input></input>

  <h4>Whats a bedtime wish you have</h4>
  
  <input></input>
    <button>GENERATE BEDTIME STORY </button>
</div>

 <audio src='http://localhost:5000/static/audio/story-1.mp3'controls></audio>

 </div>

     <footer>
      <hr/>
      <div className='footer-text'>
      <p>Report an issue</p>
      <p>© {new Date().getFullYear()} Synergy Reader. All rights reserved. </p>
      <p>Contact Us</p>
      </div>
     </footer>
     


  </div>
  
  )
}

export default App
