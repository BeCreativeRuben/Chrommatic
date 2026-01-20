import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.jsx'
import { LanguageProvider } from './contexts/LanguageContext.jsx'
import { LightboxProvider } from './contexts/LightboxContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <LightboxProvider>
        <App />
      </LightboxProvider>
    </LanguageProvider>
  </StrictMode>,
)
