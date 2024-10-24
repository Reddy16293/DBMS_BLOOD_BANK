import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import ToggleableList from './ToggleableList';

const ProfileMain = () => {
  const [showFriends, setShowFriends] = useState(false);
  const [showSentRequests, setShowSentRequests] = useState(false);
  const [showPendingRequests, setShowPendingRequests] = useState(false);
  const [showJoinRequests, setShowJoinRequests] = useState(false);

  const friends = [{ name: 'John Cena' }, { name: 'John Cena' }, { name: 'John Cena' }];
  const requests = [{ name: 'John Cena' }, { name: 'John Cena' }, { name: 'John Cena' }];

  return (
    <div className="bg-gray-900 min-h-screen p-6 flex flex-col items-center space-y-8">
      <ProfileCard />

      <div className="flex flex-col lg:flex-row lg:space-x-4 w-full max-w-6xl space-y-4 lg:space-y-0">
        <button
          className="bg-gray-800 p-4 rounded-lg text-white w-full lg:w-1/3"
          onClick={() => setShowFriends(!showFriends)}
        >
          {showFriends ? 'Hide Friend List' : 'Show Friend List'}
        </button>
        <button
          className="bg-gray-800 p-4 rounded-lg text-white w-full lg:w-1/3"
          onClick={() => setShowSentRequests(!showSentRequests)}
        >
          {showSentRequests ? 'Hide Sent Requests' : 'Show Sent Requests'}
        </button>
        <button
          className="bg-gray-800 p-4 rounded-lg text-white w-full lg:w-1/3"
          onClick={() => setShowPendingRequests(!showPendingRequests)}
        >
          {showPendingRequests ? 'Hide Pending Requests' : 'Show Pending Requests'}
        </button>
        <button
          className="bg-gray-800 p-4 rounded-lg text-white w-full lg:w-1/3"
          onClick={() => setShowJoinRequests(!showJoinRequests)}
        >
          {showJoinRequests ? 'Hide Join Requests' : 'Show Join Requests'}
        </button>
      </div>

      {/* Conditionally render the lists */}
      {showFriends && (
        <ToggleableList
          title="Friend List"
          items={friends}
          showDeleteOption={true}
          onDelete={(index) => {
            friends.splice(index, 1); // This deletes the friend locally for demo
            setShowFriends(!showFriends); // Rerender the component
          }}
        />
      )}
      {showSentRequests && <ToggleableList title="Sent Requests" items={requests} />}
      {showPendingRequests && <ToggleableList title="Pending Requests" items={requests} />}
      {showJoinRequests && <ToggleableList title="Join Requests" items={requests} />}
    </div>
  );
};

export default ProfileMain;
