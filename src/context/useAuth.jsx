import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const auth = useContext(AuthContext)
  return auth
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('token') || null
  )
  const [idUser, setIdUser] = useState(
    localStorage.getItem('idUser') || null
  )
  // hacer una petición(?) para obtener los roles
  const [roles, setRoles] = useState(null)


  const login = ({
    accessToken,
    idUser,
    roles
  }) => {
    localStorage.setItem('token', accessToken)
    localStorage.setItem('idUser', idUser)

    setAccessToken(accessToken)
    setIdUser(idUser)
    setRoles(roles)

    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('idUser')

    setAccessToken(null)
    setIdUser(null)
    setRoles(null)
    
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout,
      accessToken,
      idUser,
      roles
    }}>
      {children}
    </AuthContext.Provider>
  )
}