import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {  UserContextProvider } from './context/UserContext.jsx'
// import { HelmetProvider } from 'react-helmet';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    {/* <HelmetProvider> */}
      <App />
    {/* </HelmetProvider> */}
  </UserContextProvider>
)
