import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { SiteDataProvider } from './context/SiteData'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteDataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SiteDataProvider>
  </StrictMode>
)
