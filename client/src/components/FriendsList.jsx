import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get token from localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get('http://localhost:5001/friend/friends-list', {
          headers: {
            'x-token': token // Include JWT token in headers
          }
        });
        setFriends(response.data.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
        toast.error('Error fetching friends list');
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [token]); // Dependency array includes token

  const handleDeleteFriend = async (friendId) => {
    try {
      await axios.delete(`http://localhost:5001/friend/delete-friend/${friendId}`, {
        headers: {
          'x-token': token // Include JWT token in headers
        }
      });
      setFriends(prevFriends => prevFriends.filter(friend => friend._id !== friendId));
      toast.success('Friend removed successfully');
    } catch (error) {
      console.error("Error deleting friend:", error);
      toast.error('Error removing friend');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-white h-screen bg-gray-900 p-5 overflow-x-auto">
      <h1 className="text-4xl font-semibold mb-4">Friends List</h1>
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
            {friends.map((friend, index) => (
              <tr key={friend._id} className="hover:bg-gray-600">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{friend.fullname}</td>
                <td className="py-2 px-4">{friend.email}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDeleteFriend(friend._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300"
                  >
                    Delete Friend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FriendsList;
