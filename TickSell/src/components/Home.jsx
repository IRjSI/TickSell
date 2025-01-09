import React from 'react'
import Input from './Input'
import Buy from './Buy'
import Sell from './Sell'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='flex flex-col justify-center items-center'>
      
      <Buy />
      {/* <Sell /> */}
    </div>
  )
}

export default Home

