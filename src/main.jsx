import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FloatingButtonDemo from './components/FloatingButtonDemo.jsx'

const isDemo = window.location.pathname === '/button';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isDemo ? <FloatingButtonDemo /> : <App />}
  </StrictMode>,
)
