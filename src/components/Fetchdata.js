import React, { useState, useEffect } from 'react';
import BlankPage from './BlankPage';

const Fetchdata = ({ filters }) => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let apiUrl = 'https://api.spaceXdata.com/v3/launches?limit=10';

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
  }, [filters]);

  if (loading) {
    return <div className='text-2xl mx-auto font-bold '>Loading...</div>;
  }

  return (
    <div className='md:h-60 mb-2 '>
      <div className='grid grid-cols-1 md:flex md:flex-wrap gap-4 '>
        
        {launches.length === 0 ? <BlankPage/>:(launches.map(launch => (
          <div key={launch.flight_number} className='border p-4 bg-white h-auto w-48 '>
            <img
              src={launch.links.mission_patch_small}
              alt={`Mission Patch for ${launch.mission_name}`}
              className='h-[150px] w-[150px] object-contain mx-auto mb-2'
            />
            <h3 className='text-lg  font-bold bg-white text-violet-800'>{launch.mission_name} #{launch.flight_number}</h3>
            <p className='text-sm bg-white font-sans font-semibold'>Mission ID: {launch.flight_number}</p>
            <p className='text-sm bg-white font-semibold'>Launch Year: {launch.launch_year}</p>
            <p className='text-sm bg-white font-semibold'>Launch Success: {launch.launch_success ? 'Yes' : 'No'}</p>
            <p className='text-sm bg-white font-semibold'>Land Success: {launch.rocket.first_stage.cores[0].land_success ? 'Yes' : 'No'}</p>
          </div>
        )))}
      </div>
    </div>
  );
};

export default Fetchdata;

