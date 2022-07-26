import { LOGIN} from '../../config/Paths'
import {Navigate, useLocation} from 'react-router-dom'
// import {useAuthContext} from '../../context/AuthContext'
import { useAuth } from '../../context/useAuth'

function PrivateRoute ({children}) {
  // const { isAuthenticated } = useAuthContext()
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  /* if (isAuthenticated) {
    return <Navigate to ={PRIVATE} />
  }

  return (
    <>
      <Outlet />
    </>
  ) */

  if (!isAuthenticated) {
    return <Navigate to={LOGIN} state={{location}} />
  }

  return children
    
}

export default PrivateRoute