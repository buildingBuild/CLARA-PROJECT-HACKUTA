import { useEffect, useState,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import pause from './assets/Pause.svg'
import play from './assets/play.svg'
import './App.css'
import brandLogo from './assets/C.L.A.R.A.svg'
import Starfield from 'react-starfield';
import Loading from './Loading'
import { Waveform } from 'ldrs/react'
import 'ldrs/react/Waveform.css'

function App() {
  const [count, setCount] = useState(0)
  const [userMood,setUserMood] = useState("")
  const [userBedTimeWish, setUserBedTimeWish] = useState("")
  const [userEmail,setUserEmail] = useState("")
  const [message,setMessage] = useState("")
  const [parent,setParent] = useState(false)
  const [voiceId,setVoiceId] = useState(null)
  const audioRef = useRef(null);
  const bgAudioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState('')
  const [backAudioSrc,setBackAudioSrc] = useState('')
   const [showForm, setShowFormVisible] = useState("flex") 

  const [loading, setLoading] = useState(false)

  

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {

if (bgAudioRef.current) {
    bgAudioRef.current.loop = true;     
    bgAudioRef.current.volume = 0.3;    
    bgAudioRef.current.play()
  }

 }

  



const handleEmail = (e) => setUserEmail(e.target.value)
const handleMood = (e) => setUserMood(e.target.value)
const handleWish = (e) => setUserBedTimeWish(e.target.value)

const fetchData = async() => {
try{
  const res = await fetch('http://localhost:5000/test')
  const data = await res.json();
  setMessage(data.message)
}
catch(err){
  console.log(err.message)
}
}


const fetchGen = async () => {

  try{
    setLoading(true)
    const res  = await fetch(`http://localhost:5000/generate?email=${userEmail}&mood=${userMood}&wish=${userBedTimeWish}&parent=${true}&voice=${voiceId}`)
    setAudioSrc('http://localhost:5000/static/audio/story.mp3')
    setLoading(false)
 setShowFormVisible("none");
    
    
  }catch(err){
    console.log(err.message)
  }
  finally{
    setLoading(false)
  }
}

if(loading){
return (
    <div className="loading-screen">
      
      <div></div>
      <Loading />
       <h3 className='title-brand' style={{color:'white'}}>Patience is a Virtue</h3>
       <audio ref={bgAudioRef}  src="http://localhost:5000/static/audio/background.mp3" loop autoPlay/>
    </div>
  )
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

<div className='prompts' style={{ display: showForm }}>
<div className='userinputone'>
  <h4>Where to send your stories?</h4>
   <input onChange={handleEmail}  onClick={togglePlay}  placeholder='drsenku@gmail.com'></input>
</div>

<div className='userinputone'>
  <h4>How are you feeling today ?</h4>
  <input onChange={handleMood} placeholder="I'm kind of energetic"></input>
  </div>

<div className='userinputone'>
  <h4>What's a bedtime wish you'd love for tonight?</h4>
   <input  onChange={handleWish} placeholder='I wish to float above clouds'></input>
</div>
<button onClick={fetchGen}>GENERATE BEDTIME STORIES </button>
</div>


   

   <audio ref={audioRef} src="http://localhost:5000/static/audio/story.mp3" />
   <button onClick={togglePlayPause} style={{display : 'flex', alignItems: "center"}}>

    <img src={play}></img>
     {isPlaying ? 'Pause' : 'Play'}
      </button>


      <audio ref={bgAudioRef}  src="http://localhost:5000/static/audio/background.mp3" loop autoPlay/>

</div>
 

 {/* <audio src='http://localhost:5000/static/audio/story-1.mp3'controls></audio> */}

 </div>

     <footer>
      <hr/>
      <div className='footer-text'>
     <div></div>
      <p>© {new Date().getFullYear()} CLARA - All rights reserved. </p>
      </div>
     </footer>
     


  </div>
  
  )
}

export default App
