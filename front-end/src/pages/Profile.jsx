import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/User';
import { BaseAxios } from '../utils/Axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user , setUser] = useState([])
  const navigate = useNavigate()

  const  getUserName  = async ()=>{
      try {
          const token = localStorage.getItem("token")
          console.log(token)
          const response = await BaseAxios("/user/user-profile",{
              method: "GET",
              headers :{
                  Authorization : token

              }
          })
          console.log(response.data)
          setUser([...user,response.data])
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(()=>{
    getUserName()
},[])

const DeleteProfile = async ()=>{
  try {
    const token = localStorage.getItem("token")
    const response = await BaseAxios("/user/delete-profile",{
      method:"POST",
      headers :{
        Authorization : token

    }
     
    })

    console.log(response.data)
    localStorage.removeItem("token")
    navigate("/login")
    
  } catch (error) {
    console.log(error)
  }
}
  return (
    <div className="min-h-screen bg-gradient-to-b  from-blue-900 to-blue-700 text-white py-10 px-5">
     {user.map((user)=>(
       <div className="max-w-4xl mx-auto bg-blue-800 mt-12 p-8 rounded-lg shadow-lg">
       {/* Profile Header */}
       <div className="flex items-center space-x-6 mb-8">
         <img
           src={user.profile}
           alt="Profile"
           className="w-32 h-32 rounded-full object-cover border-4 border-blue-600"
         />
         <div>
           <h1 className="text-4xl font-semibold">John Doe</h1>
           <p className="text-blue-300">{user.email}r</p>
         </div>
       </div>

       {/* About Section */}
       <div className="mb-6">
         <h2 className="text-2xl font-semibold text-blue-200 mb-2">About</h2>
         <p className="text-blue-300">
         {user.about } </p>
       </div>

       {/* Email and Password Section */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
         <div>
           <label className="block text-blue-200 mb-1">Email</label>
           <input
             type="email"
             value="johndoe@example.com"
             className="w-full px-4 py-2 bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             disabled
           />
         </div>
         <div>
           <label className="block text-blue-200 mb-1">Password</label>
           <input
             type="password"
             value="password123"
             className="w-full px-4 py-2 bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             disabled
           />
         </div>
       </div>

       {/* Skills Section */}
       <div className="mb-6">
         <h2 className="text-2xl font-semibold text-blue-200 mb-2">Skills</h2>
         <div className="flex flex-wrap gap-3">
         {user.skills.map((skills)=>(
           <span className="bg-blue-600 px-4 py-2 rounded-full text-white">{skills}</span>

         ))}
         </div>
       </div>

       {/* Role Section */}
       <div className="mb-6">
         <label className="block text-blue-200 mb-1">Role</label>
         <input
           type="text"
           value={user.role}
           className="w-full px-4 py-2 bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
           disabled
         />
       </div>

       {/* Edit Profile Button */}
       <div className="flex justify-end">
         <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
           Edit Profile
         </button>

         <button onClick={DeleteProfile} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500">
           DELETE PROFILE 
         </button>
       </div>
     </div>
     ))}
    </div>
  );
}

export default Profile;
