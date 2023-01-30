import React from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../App';
const ProtectedRoutes = ({ component }) => {
  const { loggedIn, setLoggedIn } = useContext(UserContext)
  return(
  <>
  {localStorage.getItem('adminToken') ? component : <Navigate to={'/admin/login'}></Navigate>}
  <Outlet />
  </>
  )
}

export default ProtectedRoutes