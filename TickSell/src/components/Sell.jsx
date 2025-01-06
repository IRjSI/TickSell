import React from 'react'
import Input from './Input'
import { useForm } from "react-hook-form";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

function Sell() {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            
        },
    });
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {
            const fileId = file.$id;
            data.featuredImage = fileId;
            await appwriteService.createPost({ ...data, seller_id:userData.$id });
        }
    };

  return (
    <div className='mt-3 flex flex-col justify-center items-center'>
        <div className='flex flex-row bg-slate-700 rounded-lg p-2 mb-6 hover:cursor-pointer'>
            <div className='text-white text-center font-mono text-2xl font-bold  p-2 rounded-lg w-[150px]'>BUY</div>
            <div className='text-white text-center font-mono text-2xl font-bold bg-[#375c85] p-2 rounded-lg w-[150px]'>SELL</div>
        </div>
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="From :"
                    placeholder="From"
                    className="mb-4"
                    {...register("from_station", { required: true })}
                />
                <Input
                    label="To :"
                    placeholder="To"
                    className="mb-4"
                    {...register("to_station", { required: true })}
                />
                <Input
                    label="Date :"
                    type='date'
                    className="mb-4"
                    {...register("date", { required: true })}
                />
                <Input
                    label="PNR :"
                    placeholder="PNR"
                    className="mb-4"
                    {...register("pnr", { required: true })}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Ticket(PDF) :"
                    type="file"
                    className="mb-4"
                    accept=".pdf,.png,.jpg,.jpeg"
                    {...register("image", { required: true })}
                />
                <button type="submit" className="bg-blue-600 p-2 w-full rounded-lg text-white">
                    Sell
                </button>
            </div>
        </form>
    </div>
  )
}

export default Sell
