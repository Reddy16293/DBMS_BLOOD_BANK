import React from 'react';

const ToggleableList = ({ title, items, showDeleteOption = false, onDelete }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg w-full lg:w-1/3 mx-auto">
      <h2 className="text-white mb-4">{title}:</h2>
      <ul>
        {items.map((item, idx) => (
          <li key={idx} className="flex justify-between items-center bg-gray-700 p-2 rounded mb-2 text-white">
            <span>{idx + 1} {item.name}</span>
            {showDeleteOption && (
              <button
                className="bg-red-600 p-2 rounded text-white"
                onClick={() => onDelete(idx)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToggleableList;
