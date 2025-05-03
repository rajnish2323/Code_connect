import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from './utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest } from './utils/requestSlice';

const ConnectionRequests = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.request);
  const loggedInUser = useSelector((store) => store.user);

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err.message);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  const reviewRequest = async (status, id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Review Success:", res.data);
      fetchRequest(); // Refresh list after response
    } catch (err) {
      console.error("Request review failed:", err.message);
    }
  };

  if (!request) return null;

  if (request.length === 0) {
    return <p className="text-center mt-10">No connection requests found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10">
      <h1 className="text-2xl font-bold text-center mb-8">Connection Requests</h1>
      <div className="flex flex-col gap-4 items-center">
        {request.map((conn) => {
          const otherUser =
            conn.fromUserId._id === loggedInUser._id
              ? conn.toUserId
              : conn.fromUserId;

          return (
            <div
              key={conn._id}
              className="bg-gray-800 text-white p-4 rounded-xl w-[90%] max-w-xl flex items-center gap-4 shadow-md"
            >
              <img
                src={otherUser.photoUrl}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">
                  {otherUser.firstName} {otherUser.lastName}
                </h2>
                <p className="text-sm text-gray-300">
                  {otherUser.age || "Unknown age"},{" "}
                  {otherUser.gender || "Gender not specified"}
                </p>
                <p className="text-sm mt-1">{otherUser.about}</p>

                {/* Buttons */}
                <div className="mt-3 flex gap-4">
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => reviewRequest("rejected", conn._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => reviewRequest("accepted", conn._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConnectionRequests;
