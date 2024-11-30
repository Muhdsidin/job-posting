import React, { useState } from "react";
import { BaseAxios } from "../utils/Axios";
import { toast , ToastContainer } from "react-toastify";

function AddJobs() {
  // Define state for each input
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async  (e) => {
    e.preventDefault();
    // Log the values to confirm submission or handle the data
    console.log({ title, location, company, description });
    try {
      const response =await BaseAxios("/user/create-job", {
        method :"POST",
        headers: {
          Authorization : localStorage.getItem("token")
        },
        data:{
          title,
          location,
          company,
          description
        }
      })
      console.log(response.data)
      if(response.status === 200){
        toast.success("Job Added Successfully")
        setCompany('')
        setDescription('')
        setLocation('')
        setTitle('')
      }else{
        toast.error("Something went wrong Refresh and try again")
        window.location.reload()
      }
     
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen mt-32">
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        {/* Job Title */}
        <div className="mb-5">
          <label htmlFor="title" className="block mb-2 text-sm font-medium">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Title for..."
            required
          />
        </div>

        {/* Job Location */}
        <div className="mb-5">
          <label
            htmlFor="location"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Job Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Location"
            required
          />
        </div>

        {/* Company Name */}
        <div className="mb-5">
          <label
            htmlFor="company"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Company Name
          </label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Company"
            required
          />
        </div>

        {/* Job Description */}
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Job Description
          </label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Write your job description here..."
          ></textarea>
        </div>

        {/* Actions */}
        <div
          className="flex place-items-center mb-5 mt-4"
          style={{ justifyContent: "space-between" }}
        >
          <a href="/" className="text-blue-900 underline">
            Redirect To Home
          </a>
          <button
            type="submit"
            className="text-white bg-green-900 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Create a Post
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
}

export default AddJobs;
