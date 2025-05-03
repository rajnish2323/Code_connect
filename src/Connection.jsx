import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from './utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from './utils/connectionSlice';

const Connection = () => {
  const connection = useSelector((store) => store.connection);
  const loggedInUser = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connection) return null;
  if (connection.length === 0) return <p className="text-center mt-10 text-white">No connection found</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10">
      <h1 className="text-2xl font-bold text-center mb-8">Connections</h1>
      <div className="flex flex-col gap-4 items-center">
        {connection.map((conn) => {
          const otherUser =
            conn.fromUserId._id === loggedInUser._id
              ? conn.toUserId
              : conn.fromUserId;

          const imageUrl =
            otherUser.photoUrl?.startsWith("data:") || otherUser.photoUrl?.startsWith("http")
              ? otherUser.photoUrl
              : "https://www.cgg.gov.in/wp-content/uploads/2017/10/dummy-profile-pic-male1.jpg";

          return (
            <div
              key={conn._id}
              className="bg-gray-800 text-white p-4 rounded-xl w-[90%] max-w-xl flex items-center gap-4 shadow-md"
            >
              <img
  src={
    otherUser.photoUrl?.startsWith("data:image")
      ? otherUser.photoUrl
      : otherUser.photoUrl?.startsWith("http")
      ? otherUser.photoUrl
      : "https://www.cgg.gov.in/wp-content/uploads/2017/10/dummy-profile-pic-male1.jpg"
  }
  alt="Profile"
  className="w-16 h-16 rounded-full object-cover border border-gray-600"
/>

              <div>
                <h2 className="text-lg font-semibold">
                  {otherUser.firstName} {otherUser.lastName}
                </h2>
                <p className="text-sm text-gray-300">
                  {otherUser.age ? `Age: ${otherUser.age}` : "Age not specified"}
                </p>
                <p className="text-sm text-gray-300">
                  {otherUser.about ? otherUser.about : "About not specified"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connection;
