import './App.css'
import React from 'react'
import RoutesConfig from './routes/RoutesConfig.jsx'
// import { AuthProvider } from './context/AuthProvider'
import { AuthProvider } from './context/useAuth'


function App() {

  return (
    <div className="bg-[#FDF6EC]">
      <AuthProvider>
        <RoutesConfig />
      </AuthProvider>
    </div>
  )
}

export default App

