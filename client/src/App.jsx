import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import brandLogo from './assets/C.L.A.R.A.svg'
import Starfield from 'react-starfield';

function App() {
  const [count, setCount] = useState(0)
  const [userMood,setUserMood] = useState("")
  const [userBedTimeWish,BedTimeWish] = useState("")

const handleEmail = (event) => {
  const newMood = userMood + event.target.value
  setUserMood(newMood)
}





  return (
      <div className="container">
        
<div className="header-bar">
  <p>About us</p>
  <p>How it works</p>
  <button className='h-button'>
 Sign Up
    </button> 
</div>

<hr style={{marginTop: "-10px"}}></hr>
  <Starfield style={{zIndex : 0}}
            starCount={1000}
            starColor={[255, 255, 255]}
            speedFactor={0.05}
            backgroundColor="black"
 />
<div className='action-box'>
<div className="title-brand">
  <h1>C.L.A.R.A</h1>
  <h3>Comforting Lullabies And Restful Atmosphere</h3>

<div className='userinputone'>
  <h4>Where to send your stories?</h4>
   <input onChange={handleEmail} placeholder='drsenku@gmail.com'></input>
</div>

<div className='userinputone'>
  <h4>How are you feeling today ?</h4>
  <input onChange={handleEmail} placeholder="I'm kind of energetic"></input>
  </div>

<div className='userinputone'>
  <h4>What's a bedtime wish you'd love for tonight?</h4>
   <input  oncChange={handleEmail} placeholder='I wish to float above clouds'></input>
</div>


   <button oncClick={handleEmail}>GENERATE BEDTIME STORY </button>
</div>
 

 {/* <audio src='http://localhost:5000/static/audio/story-1.mp3'controls></audio> */}

 </div>

     <footer>
      <hr/>
      <div className='footer-text'>
     
      <p>© {new Date().getFullYear()} CLARA - All rights reserved. </p>
      </div>
     </footer>
     


  </div>
  
  )
}

export default App
