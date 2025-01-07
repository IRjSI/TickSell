import React from 'react'
import authService from '../appwrite/auth'
import { login as authLogin } from '../store/authSlice'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const signup = async (data) => {
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData))
          navigate('/')
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
 
  return (
    <div className='flex items-center justify-center w-full mt-24'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <form onSubmit={handleSubmit(signup)} className='mt-8'>
          <div className='space-y-5'>

            <input
            className='flex mb-1 pl-1 ml-32'
            type="name" 
            placeholder='name'
            {...register("name")}
            />
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
            <button  className="w-full" type='submit'>Signup</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
