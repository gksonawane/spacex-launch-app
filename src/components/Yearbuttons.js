import React from 'react'

const Yearbuttons = () => {
  const arr = [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020]
  return (
    <div className='m-2 w-auto p-3 bg-white h-auto  lg:w-80 rounded-sm'>
      <span className='bg-inherit block text-2xl font-bold'>Filters</span>
      <span className=' bg-inherit block text-center'>Launch Year</span>
      <hr className='w-[160px] my-2 mx-auto border-black'/>
      <div className='grid grid-cols-2 ml-20 lg:ml-14 bg-white '>
      {
        arr.map((item, idx) => (
          <button key={idx} className="h-6 w-14 m-1 rounded-sm bg-green-400">{item}</button>
        ))
      }
      </div>
      <div className='mt-[8px] bg-inherit'>
        <span className='bg-white block text-center '>Successful Launch</span>
        <hr className='w-[160px] my-2 mx-auto border-black' />
        <div className='bg-inherit flex justify-center gap-14'>
          <button className="h-6 w-14 m-1 rounded-sm bg-green-400">True</button>
          <button className="h-6 w-14 m-1 rounded-sm bg-green-400">Flase</button>
        </div>
      </div>
      <div className='mt-[8px] bg-inherit'>
        <span className='bg-white block text-center '>Successful Landing</span>
        <hr className='w-[160px] my-2 mx-auto border-black' />
        <div className='bg-inherit flex justify-center gap-14'>
          <button className="h-6 w-14 m-1 rounded-sm bg-green-400">True</button>
          <button className="h-6 w-14 m-1 rounded-sm bg-green-400">Flase</button>
        </div>
      </div>
      
    </div>
  )
}

export default Yearbuttons
