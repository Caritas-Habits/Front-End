import { HOME, LOGIN, USERREGISTER} from '../../config/Paths'
import {Navigate, useLocation} from 'react-router-dom'

function PrivateRoute ({children, filterAdmin}) {
  const isAuthenticated = window.localStorage.getItem('successfullyLogin') ?? false
  const roles = window.localStorage.getItem('roles') ?? []
  const location = useLocation()

  console.log('Hola soy un PrivateRoute')

  if (!isAuthenticated) {
    return <Navigate to={`/${LOGIN}`} replace state={{location}} />
  }

  if (isAuthenticated && filterAdmin && roles.includes('guest')) {
    return <Navigate to={`/${USERREGISTER}`} />
  }

  if (isAuthenticated && filterAdmin && !roles.includes('admin')) {
    return <Navigate to={`/${HOME}`} />
  }

  return children
}

export default PrivateRoute