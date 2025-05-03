import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from './utils/constants';
import { removeUser } from './utils/userSlice';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("❌ Logout failed:", err.message);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-4 py-2">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition">
        CodeMate 💻🔥
        </Link>
      </div>

      <div className="flex-none gap-4 items-center">
        {user && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border-2 border-blue-500">
                <img
                  src={
                    user.photoUrl?.startsWith("data:")
                      ? user.photoUrl
                      : user.photoUrl?.trim() ||
                        "https://www.cgg.gov.in/wp-content/uploads/2017/10/dummy-profile-pic-male1.jpg"
                  }
                  alt="User"
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="text-center text-sm font-semibold text-gray-600 py-1">
                👋 {user.firstName}
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/connection">Connections</Link>
              </li>
              <li>
                <Link to="/request">Requests</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-red-500 hover:text-red-700">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
