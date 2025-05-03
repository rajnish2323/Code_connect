import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from './utils/constants';
import { addFeed } from './utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed && Array.isArray(feed) && feed.length > 0) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log("Feed Data:", res?.data?.data);
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("Feed Error:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || !Array.isArray(feed)) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-lg">Loading feed...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">🔥 Your Feed</h1>
      {feed.length === 0 ? (
        <div className="text-xl font-semibold text-gray-400 mt-10">
          🎉 You have viewed all the feed!
        </div>
      ) : (
        <div className="w-full max-w-xl">
          <UserCard user={feed[0]} />
        </div>
      )}
    </div>
  );
};

export default Feed;
