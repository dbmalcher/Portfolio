import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/syne/400.css'
import '@fontsource/syne/600.css'
import '@fontsource/syne/700.css'
import { initAudio } from './utils/sounds'
import './index.css'
import App from './App.jsx'

initAudio();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)