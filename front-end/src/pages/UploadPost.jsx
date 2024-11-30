import React, { useState } from 'react';
import {BaseAxios} from "../utils/Axios"

function UploadPost() {
  // State variables for each input field
  const [title, setTitle] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [image, setImage] = useState(null);
  const [about, setAbout] = useState(''); // New state for the "About" field

  // Handle change for text inputs
  const handleInputChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  // Handle file input change
  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit =  async(event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("hashtags", hashtags);
    formData.append("about", about);
    // formData.append("role", role);
    formData.append("file", image);
    console.log({ title, hashtags, image, about });
    try {
      const response = await BaseAxios("/user/create-post",{
        method :"POST",
        headers: {
          Authorization : localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
        data: formData
      })

      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className='min-h-screen mt-32'>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <div className="mb-5">
          <label htmlFor="title" className="block mb-2 text-sm font-medium">Title of the Post</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => handleInputChange(e, setTitle)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="title for..."
            required
          />
        </div>
        
        <div className="mb-5">
          <label htmlFor="hashtags" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Hashtags</label>
          <input
            type="text"
            id="hashtags"
            value={hashtags}
            onChange={(e) => handleInputChange(e, setHashtags)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="#javascript #helloworld"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="about" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your About</label>
          <textarea
            id="about"
            rows="4"
            value={about}
            onChange={(e) => handleInputChange(e, setAbout)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Write about yourself..."
          ></textarea>
        </div>
        
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload Image for Your <b>POST</b></label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="user_avatar"
            type="file"
            onChange={handleFileChange}
            aria-describedby="user_avatar_help"
          />
        </div>

        <div className="flex place-items-center mb-5 mt-4" style={{ justifyContent: "space-between" }}>
          <a href="/" className="text-blue-900 underline">Redirect To Home</a>
          <button type="submit" className="text-white bg-green-900 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Create a Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadPost;
