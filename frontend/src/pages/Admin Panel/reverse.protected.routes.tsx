import React from 'react'
import {useContext} from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../App';
const ReverseProtectedRoutes = ({ component }: any) => {
  const {loggedIn, setLoggedIn} = useContext(UserContext)
  let is_loggedin = loggedIn;
  return is_loggedin==false ? component : <Navigate to={'/admin/dashboard'} replace={true}></Navigate>
}

export default ReverseProtectedRoutes