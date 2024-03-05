import React, { useState } from 'react';
import Fetchdata from './Fetchdata';

const year = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];

const Sidebar  = () => {
  const [arr, setArr] = useState(year.map(() => false));
  
  const [filters, setFilters] = useState({
    launchYear: null,
    successfulLaunch: null,
    successfulLanding: null,
  });

  const handleIndex = (idx) => {
    setArr(prevArr => {
      const newArr = prevArr.map((item, index) => {
        return index === idx;
      });
      return newArr;
    });

    // Update selected launch year filter
    setFilters(prevFilters => ({
      ...prevFilters,
      launchYear: year[idx],
    }));
  };

  const handleLaunchSuccess = () => {
    setFilters(prevFilters => ({
      ...prevFilters,
      successfulLaunch: true,
      successfulLanding: null, // Reset successful landing filter
    }));
  };

  const handleLaunchFail = () => {
    setFilters(prevFilters => ({
      ...prevFilters,
      successfulLaunch: false,
      successfulLanding: null, // Reset successful landing filter
    }));
  };

  const handleLandSuccess = () => {
    setFilters(prevFilters => ({
      ...prevFilters,
      successfulLanding: true,
      successfulLaunch: null, // Reset successful launch filter
    }));
  };

  const handleLandFail = () => {
    setFilters(prevFilters => ({
      ...prevFilters,
      successfulLanding: false,
      successfulLaunch: null, // Reset successful launch filter
    }));
  };

  

  return (
    <div className='sm:flex md:mx-2 '>
      <div className='m-2 w-auto p-3 bg-white h-auto md:w-60  sm:w-80 rounded-sm grid-col-2'>
        <span className='bg-inherit block text-2xl font-bold'>Filters</span>
        <span className='bg-inherit block text-center'>Launch Year</span>
        <hr className='w-[160px] my-2 mx-auto border-black' />
        <div className='flex flex-wrap justify-center gap-1 bg-white '>
          {arr.map((item, idx) => (
            <button
              key={idx}
              className={`h-6  m-1 rounded-sm ${item ? 'bg-green-800 text-white' : 'bg-green-400'}`}
              onClick={() => handleIndex(idx)}
              style={{ flexBasis: 'calc(50% - 40px)' }}
            >
              {year[idx]}
            </button>
          ))}
        </div>
        <div className='mt-[8px] bg-inherit'>
          <span className='bg-white block text-center'>Successful Launch</span>
          <hr className='w-[160px] my-2 mx-auto border-black' />
          <div className='bg-inherit flex justify-center gap-14'>
            <button
              className={`h-6 w-14 m-1 rounded-sm ${filters.successfulLaunch === true ? 'bg-green-800 text-white' : 'bg-green-400'}`}
              onClick={handleLaunchSuccess}
            >
              True
            </button>
            <button
              className={`h-6 w-14 m-1 rounded-sm ${filters.successfulLaunch === false ? 'bg-green-800 text-white' : 'bg-green-400'}`}
              onClick={handleLaunchFail}
            >
              False
            </button>
          </div>
        </div>
        <div className='mt-[8px] bg-inherit'>
          <span className='bg-white block text-center'>Successful Landing</span>
          <hr className='w-[160px] my-2 mx-auto border-black' />
          <div className='bg-inherit flex justify-center gap-14'>
            <button
              className={`h-6 w-14 m-1 rounded-sm ${filters.successfulLanding === true ? 'bg-green-800 text-white' : 'bg-green-400'}`}
              onClick={handleLandSuccess}
            >
              True
            </button>
            <button
              className={`h-6 w-14 m-1 rounded-sm ${filters.successfulLanding === false ? 'bg-green-800 text-white' : 'bg-green-400'}`}
              onClick={handleLandFail}
            >
              False
            </button>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center mx-2 md:mt-2 mt-4'>
        <Fetchdata filters={filters}/>
      </div>
    </div>
  );
};

export default Sidebar;