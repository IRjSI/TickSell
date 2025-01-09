import React, { useState } from 'react';
import Input from './Input';
import { useForm } from "react-hook-form";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { ID } from 'appwrite';
import { data, Link } from 'react-router-dom';

function Sell() {
    const { register, handleSubmit } = useForm();
    const { status, userData } = useSelector((state) => state.auth);

    // If the user is not logged in or data is still loading
    if (!status || !userData) {
        return <div className="text-white text-xl text-center mt-4">Loading user data...</div>;
    }

    const [trainInfo,setTrainInfo] = useState({
        train_name: '',
        train_no: ''
    })
    const apiKey = '23511fff0582e71f831cd825a7ddc043';

    const findInfo = async (pnr) => {
        const url = `http://indianrailapi.com/api/v2/PNRCheck/apikey/${apiKey}/PNRNumber/${pnr}/`;

        try {
            const response = await fetch(url);
            const result = await response.json();
            setTrainInfo({
                train_name: result.TrainName,
                train_no: result.TrainNumber
            })
        } catch (error) {
            console.error("pnr sesarching error:: ",error);
        }
    }

    const submit = async (data) => {
        await findInfo(data.pnr)
        
        if (!trainInfo.train_name || !trainInfo.train_no) {
            alert("Unable to fetch train details. Please check the PNR.");
            return;
        }

        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {
            const fileId = file.$id;
            data.featuredImage = fileId;
            data.slug = ID.unique();
            data.train_name = trainInfo.train_name;
            data.train_no = trainInfo.train_no;
            await appwriteService.uploadTicket({ ...data, seller_id: userData.$id });
        }
    };

    return (
        <div className="mt-6 flex flex-col justify-center items-center">
            <div className="flex flex-row bg-[#2d3748] rounded-lg p-2 mb-4 w-full max-w-md shadow-md">
                <Link to='/buy' className="text-white text-center font-mono text-lg font-bold w-1/2 p-2 hover:bg-[#5e6c84] rounded-l-lg">
                    BUY
                </Link>
                <Link to='/sell' className="text-white text-center font-mono text-lg font-bold w-1/2 p-2 rounded-r-lg bg-[#4a5568] transition-all">
                    SELL
                </Link>
            </div>
            <form
                onSubmit={handleSubmit(submit)}
                className="flex flex-col sm:flex-row sm:flex-wrap w-full max-w-lg gap-4 bg-[#1a202c] p-4 rounded-lg shadow-md "
            >
                <div className="flex flex-col w-full sm:w-1/2 justify-center">
                    <Input
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
                    />
                    <Input
                        label="PNR :"
                        placeholder="PNR"
                        className="mb-3"
                        {...register("pnr", { required: true })}
                    />
                </div>
                <div className="flex flex-col sm:w-1/2">
                    <Input
                        label="Ticket (PDF) :"
                        type="file"
                        className="mb-3"
                        accept=".pdf,.png,.jpg,.jpeg"
                        {...register("image", { required: true })}
                    />
                        </div>
                    <button
                        type="submit"
                        className="bg-[#2b6cb0] w-full p-2 rounded-lg text-white font-medium hover:bg-[#2c5282] transition-all"
                    >
                        Sell
                    </button>
            </form>
        </div>
    );
}

export default Sell;
