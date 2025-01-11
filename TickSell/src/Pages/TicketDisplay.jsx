import React from 'react'
import { useLocation } from 'react-router-dom';

function TicketDisplay() {
  const location = useLocation();
  const tickets = location.state ? location.state.tickets : []; // to access data passed by state
  console.log(location);
  
  return (
    <div className='p-8 grid grid-cols-4 gap-4'>
        {tickets.length > 0 ? (
        tickets.map((ticket, index) => (
          <div
            key={index}
            className="bg-slate-600 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-lg shadow-md mb-4 w-full"
          >
            <p className="text-lg font-semibold">
                <strong>Train:</strong> {ticket.train_name}
            </p>
            <p className="text-lg font-semibold">
                <strong>Train No.:</strong> {ticket.train_no}
            </p>
            <p className="text-lg font-semibold">
                <strong>From:</strong> {ticket.from_station}
            </p>
            <p className="text-lg font-semibold">
                <strong>Destination:</strong> {ticket.to_station}
            </p>
            {/* <p className="text-lg font-semibold">
                <strong>Booked Till:</strong> {ticket.booked_till}
            </p> */}
            <p className="text-lg font-semibold">
                <strong>Date:</strong> {ticket.date}
            </p>
            <p className="text-lg font-semibold">
                <strong>Price:</strong> {ticket.price}
            </p>
            <button className='bg-green-500 hover:bg-green-600 p-2 rounded-md w-full mt-2 font-semibold'>Buy</button>
          </div>
      ))
      ) : 
      (
        <p className="text-white text-lg p-4 text-center bg-gray-800 rounded-lg shadow-md">
            No tickets found
        </p>
      )
      }

    </div>
  )
}

export default TicketDisplay
