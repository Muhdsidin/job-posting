import React, { useEffect, useState } from 'react';
import { BaseAxios } from '../../utils/Axios';

function Card() {
  const [data, setData] = useState([]);

  const getDetailedData = async () => {
    try {
      const response = await BaseAxios.get("/user/get-post");
      setData(response.data); // Assume response.data is the array of posts
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDetailedData();
  }, []);

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center mt-16">
      {data.map((post) => (
        <div key={post._id} className="bg-white p-8 rounded-lg shadow-md max-w-md mt-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <img src={post.user.profile} alt="User Avatar" className="w-8 h-8 rounded-full" />
              <div>
                <a href={`/${post.user.email}/profile`} className="text-gray-800 font-semibold">{post.user.email}</a>
                <p className="text-gray-500 text-sm">Posted 2 hours ago</p>
              </div>
            </div>
            <div className="text-gray-500 cursor-pointer">
              <button className="hover:bg-gray-50 rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="7" r="1" />
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="17" r="1" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-800">
              {post.title} - {post.discreption} <br />
              <a href="#" className="text-blue-600">{post.hashtags}</a>
            </p>
          </div>

          <div className="mb-4">
            <img src={post.media} alt="Post Image" className="w-full h-48 object-cover rounded-md" />
          </div>

          <div className="flex items-center justify-between text-gray-500">
            <div className="flex items-center space-x-2">
              <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
                <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>42 Likes</span>
              </button>
            </div>
            
          </div>
          
          <hr className="mt-2 mb-2" />
          <p className="text-gray-800 font-semibold">Comments</p>
          <hr className="mt-2 mb-2" />
          
        </div>
      ))}
    </div>
  );
}

export default Card;
