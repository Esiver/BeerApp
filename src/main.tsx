import React from 'react'
import ReactDOM from 'react-dom/client'
import BeerApp from './BeerApp.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BeerApp />
  </React.StrictMode>,
)
