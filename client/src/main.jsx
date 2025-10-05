import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Stars from './Stars.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <App></App>
  </StrictMode>,
)
