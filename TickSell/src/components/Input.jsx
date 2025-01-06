import React, { forwardRef, useId, useState } from 'react'
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

function Input({
    label,
    type='text',
    className='',
    ...props
},ref) {
    const [stations,setStations] = useState([]);
    const [query,setQuery] = useState('');
    const apiKey = '23511fff0582e71f831cd825a7ddc043';

    const searchStations = async (query) => {
        const url = `https://indianrailapi.com/api/v2/AutoCompleteStation/apikey/${apiKey}/StationCodeOrName/${query}/`;

        try {
            const response = await fetch(url);
            const result = await response.json();
            setStations(result.Station)
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (event) => {
        setQuery(event.target.value);
        setStations([]);
        if (event.target.value.length === 0) {
            // Reset stations list when input is cleared
            setStations([]);
        } else if (event.target.value.length > 2) {
            // Trigger station search only for queries longer than 2 characters
            searchStations(event.target.value);
        }
    };
    const id = useId();
    return (
        <div className='flex flex-col w-[300px]'>
            {label && <label
            className='inline-block mb-1 pl-1 text-white'
            htmlFor={id}>
                {label}
            </label>}
            <input type={type}
            className={`${className} p-2 w-full rounded-md outline-none bg-slate-600 text-white`}
            ref={ref}
            {...props}
            id={id}
            value={query}
            onChange={handleChange}
            />
            {query ? ((stations.length > 0) ? <ul className='text-white bg-gray-800 rounded-lg p-3 mt-1'>
                {stations.map((station) => (
                    <li 
                    className='hover:bg-gray-900 p-2 rounded-lg'
                    key={station.StationCode} onClick={() => setQuery(station.NameEn)}>{station.NameEn}</li>
                ))}
            </ul> : <div className="flex justify-center items-center">
                        <ClipLoader color="#0470ef" />
                    </div>) : null}
        </div>
  )
}

export default forwardRef(Input);
