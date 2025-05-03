import axios from 'axios';
import React from 'react';
import { BASE_URL } from './utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserfromFeed } from './utils/feedSlice';

const UserCard = ({ user }) => {
  if (!user) return null;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    console.log("Sending request:", status, userId);
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${userId}/${status}`,
        {},
        { withCredentials: true }
      );
      console.log("Success:", res.data);
      dispatch(removeUserfromFeed(userId));
    } catch (err) {
      console.error("Request failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="bg-gray-800 text-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto transition-transform duration-300 hover:scale-105">
      <div className="flex flex-col items-center">
        <img
          src={
            user.photoUrl?.trim() ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="User"
          className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-700"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = user.photoUrl?.trim() || "https://cdn-icons-png.flaticon.com/512/149/149071.png";
          }}
        />
        <h2 className="text-2xl font-bold text-center mb-2">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-sm text-gray-300 mb-2 text-center">{user.about || "No about info"}</p>
        <p className="text-sm text-gray-400 mb-1">Age: {user.age || "Unknown"}</p>
        <p className="text-sm text-gray-400 mb-4">
          Skills: {
            Array.isArray(user.skills)
              ? user.skills.join(', ')
              : typeof user.skills === 'string'
                ? user.skills
                : 'No skills listed'
          }
        </p>
        <div className="flex gap-4">
          <button
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition"
            onClick={() => handleSendRequest("ignored", user._id)}
          >
            Ignore
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold transition"
            onClick={() => handleSendRequest("interested", user._id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
