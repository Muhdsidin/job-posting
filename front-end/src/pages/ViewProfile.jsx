import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseAxios } from '../utils/Axios';

function ViewProfile() {
  const { user } = useParams(); // Get the dynamic user ID from the URL
  const [userData, setUserData] = useState(null); // State to store user data

  // Fetch user data based on user ID from URL
  const getUser = async () => {
    try {
      const response = await BaseAxios.get(`/user/${user}/user-profile`);
      setUserData(response.data); // Store user data in state
    } catch (error) {
      console.log('Error fetching user data:', error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // Loading state
  if (!userData) {
    return <p className="text-center mt-32">Loading...</p>;
  }

  // Render user profile data
  return (
    <div className="min-h-screen mt-32 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {/* Profile Image */}
        <img
          src={userData.profile}
          alt="User Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />

        {/* User Email */}
        <h1 className="text-center text-2xl font-bold mb-2">{userData.email}</h1>

        {/* User Role */}
        <p className="text-center text-gray-600 mb-4">{userData.role}</p>

        {/* About Section */}
        <h2 className="font-semibold text-lg mb-1">About:</h2>
        <p className="text-gray-800 mb-4">{userData.about || 'No information provided.'}</p>

        {/* Skills Section */}
        <h2 className="font-semibold text-lg mb-1">Skills:</h2>
        <ul className="list-disc list-inside text-gray-800 mb-4">
          {userData.skills && userData.skills.length > 0 ? (
            userData.skills.map((skill, index) => <li key={index}>{skill}</li>)
          ) : (
            <li>No skills listed.</li>
          )}
        </ul>

        {/* Jobs Section */}
        <h2 className="font-semibold text-lg mb-1">Jobs:</h2>
        <ul className="list-disc list-inside text-gray-800 mb-4">
          {userData.job && userData.job.length > 0 ? (
            userData.job.map((job, index) => <li key={index}>{job}</li>)
          ) : (
            <li>No jobs listed.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ViewProfile;
