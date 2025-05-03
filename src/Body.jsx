import React, { useEffect } from 'react';
import Navbar from './navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { BASE_URL } from './utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true, // fixed typo: "withcredentials"
      });
      dispatch(addUser(res.data)); // load user into redux store
    } catch (err) {
      console.error("Error fetching user on refresh:", err);
    }
  };

  useEffect(() => {
    fetchUser(); // call it once on mount
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
