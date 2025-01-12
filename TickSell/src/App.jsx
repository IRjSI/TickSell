import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { login,logout } from './store/authSlice'
import Login from './components/Login'
import Signup from './components/Signup'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData})) // if user found
      } else {
        dispatch(logout()) // if not found
      }
    })
    .finally(setLoading(false))
  },[])

  return loading ? null : (
    <div className='min-h-screen flex flex-wrap content-between font-sans'>
      <div className='w-full block'>
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default App
