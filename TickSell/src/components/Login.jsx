import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { login as authLogin } from '../store/authSlice'
import { useForm } from 'react-hook-form'
import {useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom'

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error,setError] = useState('');

  const login = async (data) => {
    setError('')
    try {
      const session = await authService.login(data); //throws error if invalid credentials or any other reasons
        if (session) { // if login is successfull
          const userData = await authService.getCurrentUser(); // getting info for user just logged in
          if (userData) {
            dispatch(authLogin(userData)); // for state management
            navigate('/')
          }
        }
    } catch(error) {
      setError(error.message);
      console.log(error.message);
    }
  }

  return (
    <div className='flex items-center justify-center w-full mt-24'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
      {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-5'>

            <input
            className='flex mb-1 pl-1 ml-32'
            type="email" 
            placeholder='Email'
            {...register("email")}
            />
            <input
            className='flex mb-1 pl-1 ml-32'
            type="password" 
            placeholder='Password'
            {...register("password")}
            />
            <button  className="w-full" type='submit'>Login</button>
            
          </div>
        </form>
        
      </div>
    </div>
  )
}

export default Login
