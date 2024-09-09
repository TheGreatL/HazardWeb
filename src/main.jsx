import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import Run from './Run'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Run/>
  </StrictMode>,
)
