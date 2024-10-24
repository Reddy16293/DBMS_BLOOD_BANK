import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card'; // Import the Card component

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const type = new URLSearchParams(location.search).get('type');

  // State to hold the results
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`http://localhost:5001/search/`, {
          params: {
            query: query,
            type: type,
          },
          headers: {
            'x-token': token,
          },
        });

        console.log(response.data); // Log the response to check its structure

        // Directly access the developers array
        setResults(response.data.developers || []); // Fallback to empty array if not found
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (query && type) {
      fetchSearchResults();
    }
  }, [query, type]);

  if (!localStorage.getItem('token')) {
    return <Navigate to='/login' />;
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-white">Error: {error}</div>;
  }

  return (
    <div className='flex flex-col justify-start items-center min-h-screen text-white'>
      <div className="text-4xl my-8">Search Results</div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 overflow-hidden">
        {results.length > 0 ? 
          results.map((result) => <Card key={result._id} profile={result} />) 
          : <div>No results found.</div>
        }
      </div>
    </div>
  );
};

export default SearchResults;
