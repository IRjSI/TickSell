import React from 'react'
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { logout as authLogout } from '../../store/authSlice';

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await authService.logout();
    dispatch(authLogout());
  }
  
  return (
    <div>
      <button onClick={logoutHandler}>
        Logout
      </button>
    </div>
  )
}

export default LogoutBtn
