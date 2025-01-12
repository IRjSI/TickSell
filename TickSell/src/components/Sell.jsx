import React, { useState } from 'react';
import Input from './Input';
import { useForm } from "react-hook-form";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { ID } from 'appwrite';
import { Link } from 'react-router-dom';

function Sell() {
    const { register, handleSubmit } = useForm();
    const { status, userData } = useSelector((state) => state.auth);
    const [trainInfo,setTrainInfo] = useState({
        train_name: '',
        train_no: ''
    })
    
    // If the user is not logged in or data is still loading
    if (!status || !userData) {
        return <div className="text-white text-xl text-center mt-4">Loading user data...</div>;
    }

    const apiKey = String(import.meta.env.VITE_RAIL_API_KEY);

    const findInfo = async (pnr) => {
        const url = `https://pnr-status-indian-railway-pnr-check1.p.rapidapi.com/pnrno/${pnr}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': `${apiKey}`,
                'x-rapidapi-host': 'pnr-status-indian-railway-pnr-check1.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);

            if (!result.TrainName || !result.TrainNo || !result.Class) {
                throw new Error(`Incomplete train details in API response::${result.TrainName}::${result.TrainNo}::${result.Class}`);
            }

            return {
                from_station: result.From,
                to_station: result.To,
                date: result.Doj,
                train_name: result.TrainName,
                train_no: result.TrainNo,
                tier: result.Class,
                price: result.TicketFare,
                coach: result.PassengerStatus[0].CurrentStatus
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const submit = async (data) => {
        const trainDetails = await findInfo(data.pnr)
        
        if (!trainDetails || !trainDetails.train_name || !trainDetails.train_no) {
            alert("Unable to fetch train details. Please check the PNR.");
            return;
        }

        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {
            const fileId = file.$id;
            data.featuredImage = fileId;
            data.slug = ID.unique();
            data.from_station = trainDetails.from_station;
            data.to_station = trainDetails.to_station;
            data.date = trainDetails.date;
            data.train_name = trainDetails.train_name;
            data.train_no = trainDetails.train_no;
            data.tier = trainDetails.tier;
            data.price = trainDetails.price;
            data.coach = trainDetails.coach;
            await appwriteService.uploadTicket({ ...data, seller_id: userData.$id });
        }
    };

    return (
        <div className="mt-6 flex flex-col justify-center items-center">
            <div className="flex flex-row bg-[#10141b] rounded-lg p-2 mb-4 w-full max-w-md shadow-md">
                <Link to='/buy' className="text-white text-center font-mono text-lg w-1/2 p-2 hover:bg-[#171d27] rounded-l-lg">
                    BUY
                </Link>
                <Link to='/sell' className="text-white text-center font-mono text-lg w-1/2 p-2 rounded-r-lg bg-[#22272f] transition-all">
                    SELL
                </Link>
            </div>
            <form
                onSubmit={handleSubmit(submit)}
                className="flex flex-col sm:flex-row sm:flex-wrap w-full max-w-lg gap-4 bg-[#10141b] p-4 rounded-lg shadow-md "
            >
                <div className="flex flex-col w-full sm:w-1/2 justify-center">
                    {/*<Input
                        label="From :"
                        placeholder="From"
                        className="mb-3"
                        {...register("from_station", { required: true })}
                    />
                    <Input
                        label="To :"
                        placeholder="To"
                        className="mb-3"
                        {...register("to_station", { required: true })}
                    />
                    <Input
                        label="Date :"
                        type="date"
                        className="mb-3"
                        {...register("date", { required: true })}
                    />*/}
                    <Input
                        label="PNR :"
                        placeholder="PNR"
                        className="block w-full bg-gray-800 bg-opacity-55 text-white rounded-lg p-3"
                        {...register("pnr", { required: true })}
                    />
                </div>
                <div className="flex flex-col sm:w-1/2">
                     <Input
                        label="Ticket (PDF) :"
                        type="file"
                        className="block w-full bg-gray-800 bg-opacity-55 text-white rounded-lg p-3"
                        accept=".pdf,.png,.jpg,.jpeg"
                        {...register("image", { required: true })}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-[#2b6cb0] w-full p-2 mt-4 rounded-lg text-white font-medium hover:bg-[#2c5282] transition-all"
                >
                    Sell
                </button>
            </form>
        </div>
    );
}

export default Sell;
