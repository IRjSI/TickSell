import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'

function AllTickets() {
    const [tickets,setTickets] = useState([])
    useEffect(() => {}, [])
    appwriteService.getTickets([]).then((tickets) => {
        if (tickets) {
            setTickets(tickets.documents)
        }
    })
  return (
    <div className='py-8 w-full'>
        <div className='flex flex-wrap'>
            {tickets.map((ticket) => (
                <div key={ticket.$id} className='p-2 w-1/4'>
                    {ticket}
                </div>
            ))}
        </div>
    </div>
  )
}

export default AllTickets
