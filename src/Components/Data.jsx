import React, { useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { WiDaySnowThunderstorm, WiDayCloudyGusts, WiDaySunny, WiStrongWind, WiHumidity } from "weather-icons-react";
import axios from 'axios';

const Data = () => {

  const apiKey = '05fd6775f99f2d7f1fb3d4110d3cee6a';
  const [city, setCity] = useState("London");
  const [tempCity, setTempCity] = useState(city);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setTempCity(e.target.value);
    console.log(tempCity);
  };

  const search = () => {
    setCity(tempCity);
    console.log(city);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  useEffect(() => {
    const apiCall = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
      setLoading(false);
    };
    
    apiCall();
  }, [city]);

  if (loading) return <div>Loading......</div>;

  return (
    <div>
      <div className="flex w-72 justify-between rounded-3xl border border-gray-300 bg-white p-2">
        <input
          className='focus:outline-none focus:border-none'
          placeholder="Search here"
          type="text"
          onChange={handleChange}
          onKeyPress={handleKeyPress} 
        />
        <IoIosSearch onClick={search} className='cursor-pointer w-8 h-6 bg-orange-400 rounded-full' />
      </div>

      <h1 className='flex justify-center font text-2xl items-center m-4 font-bold'>{data.name}</h1>

      <p className='flex justify-center font text-lg m-4 mb-0 items-center text-gray-500'></p>

      <p className='flex justify-center font text-lg items-center text-gray-500'></p>
      
      <div className='flex justify-between text-4xl m-2'>
        <WiDaySnowThunderstorm />
        <WiDayCloudyGusts />
        <WiDaySunny />
      </div>

      <h1 className='flex justify-center font text-3xl items-center font-bold'>{data?.main?.temp}°C</h1>
      <div className='flex justify-around font items-center m-2 text-lg'>
        <h1>max-temp</h1>
        <h1>min-temp</h1>
      </div>
      <div className='flex justify-around items-center font font-bold text-red-700 text-base'>
        <h1>{data?.main?.temp_max} °C</h1>
        <h1>{data?.main?.temp_min} °C</h1>
      </div>
      <div className='flex justify-between text-lg m-2'>
        <h1 className=''>wind speed</h1>
        <h1>Humidity</h1>
      </div>
      <div className='flex justify-between text-lg m-2'>
        <h1 className='flex'> <WiStrongWind className='text-3xl' />{data.wind?.speed} km/h</h1>
        <h1 className='flex'> <WiHumidity className='text-3xl' /> {data.main?.humidity}%</h1>
      </div>
    </div>
  );
};

export default Data;
