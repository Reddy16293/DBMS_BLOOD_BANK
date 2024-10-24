import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Requests = () => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReceivedRequests = async () => {
      try {
        console.log("Fetching received friend requests..."); // Debugging statement
        const response = await axios.get('http://localhost:5001/friend/requests/received', {
          headers: {
            'x-token': localStorage.getItem('token'), // Send token with the request
          },
        });
        console.log("Received requests:", response.data); // Debugging statement
        setReceivedRequests(response.data); // Set received requests in state
      } catch (error) {
        console.error('Error fetching received requests:', error.response ? error.response.data : error.message);
        toast.error('Error fetching received requests');
      } finally {
        setLoading(false);
      }
    };

    fetchReceivedRequests(); // Fetch received requests on component mount
  }, []);

  const handleAccept = async (requestId) => {
    try {
      console.log("Accepting request with ID:", requestId); // Debugging statement
      const response = await axios.post(`http://localhost:5001/friend/accept-request`, { friendId: requestId }, {
        headers: {
          'x-token': localStorage.getItem('token'), // Send token with the request
        },
      });
      console.log("Response after accepting request:", response.data); // Debugging statement
      setReceivedRequests((prevRequests) => prevRequests.filter((req) => req._id !== requestId));
      toast.success('Friend request accepted');
    } catch (error) {
      console.error('Error accepting request:', error.response ? error.response.data : error.message);
      toast.error('Error accepting friend request');
    }
  };

  const handleReject = async (requestId) => {
    try {
      console.log("Rejecting request with ID:", requestId); // Debugging statement
      const response = await axios.post(`http://localhost:5001/friend/reject-request`, { friendId: requestId }, {
        headers: {
          'x-token': localStorage.getItem('token'), // Send token with the request
        },
      });
      console.log("Response after rejecting request:", response.data); // Debugging statement
      setReceivedRequests((prevRequests) => prevRequests.filter((req) => req._id !== requestId));
      toast.success('Friend request rejected');
    } catch (error) {
      console.error('Error rejecting request:', error.response ? error.response.data : error.message);
      toast.error('Error rejecting friend request');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div className="text-white h-screen bg-gray-900 p-5 overflow-x-auto">
      <h1 className="text-4xl font-semibold mb-4">Received Friend Requests</h1>
      {receivedRequests.length === 0 ? (
        <p>No received requests.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-2 px-4 text-left">S.No</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {receivedRequests.map((request, index) => (
                <tr key={request._id} className="hover:bg-gray-600">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{request.fullname}</td>
                  <td className="py-2 px-4">{request.email}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleAccept(request._id)}
                      className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition duration-300"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(request._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300 ml-2"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Requests;
