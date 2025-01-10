import React from 'react'
import Input from './Input'
import Buy from './Buy'
import Sell from './Sell'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Home() {
  const authStatus = useSelector((state) => state.auth.status) 
  return (
    <div className='flex flex-col justify-center items-center'>
      
      {authStatus ? <Buy /> : (<h3 className='text-white text-3xl'>Login...</h3>)}
      
    </div>
  )
}

export default Home

