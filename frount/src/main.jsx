import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AudioPlayer from './AudioPlayer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AudioPlayer />
  </StrictMode>,
)
