import { UseSelector, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute= () => {
  const currentUser = useSelector(state => state.user.currentUser)

  if (currentUser) {
    return <Outlet />
  } else {
    return <Navigate to={'/sign-in'}/>
  } 
}

export default PrivateRoute