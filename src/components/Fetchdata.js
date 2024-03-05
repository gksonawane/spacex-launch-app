
import React, { useState, useEffect } from 'react';
import BlankPage from './BlankPage';

const Fetchdata = ({ filters }) => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    setLoading(true);
    let apiUrl = `https://api.spaceXdata.com/v3/launches?limit=${perPage}&offset=${(page - 1) * perPage}`;

    // Apply filters if they are provided
    if (filters) {
      const { launchYear, successfulLaunch, successfulLanding } = filters;

      if (launchYear) {
        apiUrl += `&launch_year=${launchYear}`;
      }
      if (successfulLaunch !== null) {
        apiUrl += `&launch_success=${successfulLaunch}`;
      }
      if (successfulLanding !== null) {
        apiUrl += `&land_success=${successfulLanding}`;
      }
    }
    // Fetch data from the API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setLaunches(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [filters, page]);
  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  useEffect(() => {
    setPage(1); // Reset page to 1 when filters change
  }, [filters]);

  if (loading) {
    return <div className='text-2xl mx-auto font-bold'>Loading...</div>;
  }

  return (
    <div className='md:h-60 mb-4 md:48'>
      <div className='grid grid-cols-1 md:flex md:flex-wrap gap-4 '>

        {launches.length === 0 ? <BlankPage /> : (launches.map(launch => (
          <div key={launch.flight_number} className='border p-8 bg-white h-auto md:mx-4 sm:w-56 md:w-48 rounded-md'>
            <img
              src={launch.links.mission_patch_small}
              alt={`Mission Patch for ${launch.mission_name}`}
              className='h-[250px] w-[290px] md:h-[150px] md:w-[150px] object-contain mx-auto mb-2'
            />
            <h3 className='text-lg  font-bold bg-white text-violet-800'>{launch.mission_name} #{launch.flight_number}</h3>
            <p className='text-sm bg-white font-sans font-semibold'>Mission ID: {launch.flight_number}</p>
            <p className='text-sm bg-white font-semibold'>Launch Year: {launch.launch_year}</p>
            <p className='text-sm bg-white font-semibold'>Launch Success: {launch.launch_success ? 'Yes' : 'No'}</p>
            <p className='text-sm bg-white font-semibold'>Land Success: {launch.rocket.first_stage.cores[0].land_success ? 'Yes' : 'No'}</p>
          </div>
        )).slice(0, perPage)
        )}
      </div>
      {launches.length > 0 && (
      <div className='static bottom-0 left-0 right-0 flex justify-center  py-4'>
        <button
          className='bg-green-400 px-4 py-2 rounded-lg mr-2 hover:bg-green-800 hover:text-white transition ease-out hover:cursor-pointer'
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Prev
        </button>
        <button
          className='bg-green-400 px-4 py-2 rounded-lg ml-2 hover:bg-green-800 hover:text-white transition ease-out'
          onClick={handleNextPage}
          disabled={launches.length < perPage}
        >
          Next
        </button>
      </div>
      )}
    </div>
  );
};

export default Fetchdata;

