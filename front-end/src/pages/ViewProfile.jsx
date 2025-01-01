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
  console.log(userData)

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
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
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

        {/* media  Section */}
        {userData.role === "SEEKER" ?<> <h2 className="font-semibold text-lg mb-1">media:</h2>
        <ul className="list-disc list-inside text-gray-800 mb-4">
          {userData.media && userData.media.length > 0 ? (
            userData.media.map((media, index) => <li key={index}>
              <>
              

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
        
      
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                    
                </th>
                <th scope="col" class="px-6 py-3">
                    images
                </th>
                <th scope="col" class="px-6 py-3">
                    title
                </th>
               
            </tr>
        </thead>
        <tbody>
           
            <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    
                </td>
                <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <img class="w-10 h-10 rounded-full" src={media.media} alt="Jese image" />
                    <div class="ps-3">
                        <div class="text-base font-semibold">{media.title}</div>
                   
                    </div>
                </th>
               
              
              
            </tr>
        </tbody>
    </table>
</div>

              </>
            </li>)
          ) : (
            <li>No media listed.</li>
          )}
        </ul> </>: ""}

        
        
       
      </div>
    </div>
  );
}

export default ViewProfile;
