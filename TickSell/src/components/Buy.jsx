import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import appwriteService from '../appwrite/config';
import Input from './Input';
import { Link } from 'react-router-dom';

function Buy() {
    const [tickets, setTickets] = useState([]);
    const { register, handleSubmit } = useForm();

    const submit = async (data) => {
        const fetchedTickets = await appwriteService.getTickets({
            from_station: data.from_station,
            to_station: data.to_station,
            date: data.date,
        });

        setTickets(fetchedTickets);
    };

    return (
        <div className="mt-6 flex flex-col justify-center items-center">
            <div className="flex flex-row bg-[#2d3748] rounded-lg p-2 mb-4 w-full max-w-md shadow-md">
                <Link to='/buy' className="text-white text-center font-mono text-lg font-bold w-1/2 p-2 bg-[#4a5568] rounded-l-lg">
                    BUY
                </Link>
                <Link to='/sell' className="text-white text-center font-mono text-lg font-bold w-1/2 p-2 rounded-r-lg hover:bg-[#5e6c84] transition-all">
                    SELL
                </Link>
            </div>
            <form onSubmit={handleSubmit(submit)} className="flex flex-col sm:flex-row sm:flex-wrap w-full max-w-lg gap-4 bg-[#1a202c] p-4 rounded-lg shadow-md">
                <div className="space-y-4">
                    <Input
                        label="From :"
                        placeholder="From"
                        className="block w-full bg-gray-800 text-white rounded-lg p-3"
                        {...register("from_station", { required: true })}
                    />
                    <Input
                        label="To :"
                        placeholder="To"
                        className="block w-full bg-gray-800 text-white rounded-lg p-3"
                        {...register("to_station", { required: true })}
                    />
                    <Input
                        label="Date :"
                        type="date"
                        className="block w-full bg-gray-800 text-white rounded-lg p-3"
                        {...register("date", { required: true })}
                    />
                </div>
                    <button
                        type="submit"
                        className="bg-[#2b6cb0] w-full mt-4 p-2 rounded-lg text-white font-medium hover:bg-[#2c5282] transition-all"
                    >
                        Find Tickets
                    </button>
     
            </form>

            {/* Tickets */}
            <div className="mt-6 w-full max-w-lg">
                {tickets.length > 0 ? (
                    tickets.map((ticket, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 text-white p-4 rounded-lg shadow-md mb-4"
                        >
                            <p className="text-lg font-semibold">
                                <strong>From:</strong> {ticket.from_station}
                            </p>
                            <p className="text-lg font-semibold">
                                <strong>To:</strong> {ticket.to_station}
                            </p>
                            <p className="text-lg font-semibold">
                                <strong>Date:</strong> {ticket.date}
                            </p>
                            <p className="text-lg font-semibold">
                                <strong>Price:</strong> {ticket.price}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-white text-lg p-4 text-center bg-gray-800 rounded-lg shadow-md">
                        No tickets found
                    </p>
                )}
            </div>
        </div>
    );
}

export default Buy;
