import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="container">
<div className="header-bar">
  <p>About us</p>
  <p>How it works</p>
  <button>Sign Up</button> 
</div>
<hr></hr>



<div className="header">
  <h1></h1>
</div>



        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>









       <audio src='http://localhost:5000/static/audio/story-1.mp3'controls></audio>
     
      <h1>C.L.A.R.A</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>


     <footer>
      <h1>Report an issue</h1>
      <h1>Report an issue</h1>
      <h1>Report an issue</h1>
     </footer>
     

       </div>
  
  )
}

export default App
