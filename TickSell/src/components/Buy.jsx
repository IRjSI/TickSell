import React from 'react'
import Input from './Input'

function Buy() {
  return (
    <div className='mt-12 flex flex-col justify-center items-center'>
        <div className='flex flex-row bg-slate-700 rounded-lg p-2 mb-6 hover:cursor-pointer'>
            <div className='text-white text-center font-mono text-2xl font-bold bg-[#375c85] p-2 rounded-lg w-[150px]'>BUY</div>
            <div className='text-white text-center font-mono text-2xl font-bold bg-transparent p-2 rounded-lg w-[150px]'>SELL</div>
        </div>
        <form className='flex flex-col gap-4'>
            <Input label='From' placeholder='From'/>
            <Input label='To' placeholder='To'/>
            <label
            className='inline-block pl-1 text-white'
            htmlFor='date'>
                Date
            </label>
            <input type="date" id='date' className={`p-2 w-full rounded-md outline-none bg-slate-600 text-white`}/>
            <button className="mt-4 shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear">
                Buy
            </button>
        </form>
    </div>
  )
}

export default Buy
