import React, { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from './utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [skills, setSkills] = useState(user.skills);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, skills, age, photoUrl, about },
        { withCredentials: true }
      );
      console.log("Profile updated:", res.data);
      dispatch(addUser(res?.data?.data));
      setError('');
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center my-7 mb-10 ">
      <div className="flex justify-center mx-10 mb-4 ">
        <div className="card bg-gray-800 text-primary-content w-96">
          <div className="card-body justify-center ">
            <h2 className="card-title">Edit Profile</h2>
            <div className="form-control text-black font-black">
              <label className="label">First Name</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <label className="label mt-2">Last Name</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <label className="label mt-2">Skills</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />

              <label className="label mt-2">Age</label>
              <input
                type="number"
                className="input input-bordered"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <label className="label mt-2 w-5 h-5 s object-cover">Photo URL</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Photo URL"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />

              <label className="label mt-2">About</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="About"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <div className="card-actions justify-center mt-4">
              {error && <p className="text-red-500 font-bold">{error}</p>}
              <button
                className="btn btn-secondary"
                onClick={saveProfile}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <UserCard user={{ firstName, lastName, skills, age, photoUrl, about }} />
    </div>
  );
};

export default EditProfile;
