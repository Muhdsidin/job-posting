import React, { useState } from "react";
import { BaseAxios } from "../utils/Axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState(null);
  const [skills , setSkills] = useState([])
  const [add , setAdd]  = useState("")
  const [name , setName ] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("about", about);
    formData.append("role", role);
    formData.append("file", file);
    formData.append("skills" , skills)
    formData.append("name" , name)

    try {
      const response = await BaseAxios("/user/create-profile", {
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setAbout("");
      setRole("");
      setPassword("");
      setEmail("");
      setFile(null);
      setName("")
      navigate('/login')
    } catch (error) {
      console.log(error);
      // Handle form submission logic here
      console.log({ email, password, about, role, file });
    }
  };

  const handleSkills = ()=>{
    setSkills([...skills , add])
    console.log(skills)
  }
  return (
    <div className="min-h-screen mt-32 ">
      <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

    {/* user name imput iunder this  */}
    <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
           UserName 
          </label>
          <input
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Usernmae "
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        {/* user name ended  */}


        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="about"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your About
          </label>
          <textarea
            id="about"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write about yourself..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </div>n

        <div className="mb-5">

          { role === 'HIRING_MANAGER' ? " ":
          <>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Add Skills
          </label>
          <input
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            value={add}
            onChange={(e) => setAdd(e.target.value)}
            required
          />

          <button onClick={handleSkills} className=" btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 ">Add Skills</button>
          </> } 
        
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <select
            id="role"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">SELECT YOUR ROLE</option>
            <option value="HIRING_MANAGER">HIRING MANAGER</option>
            <option value="SEEKER">JOB SEEKER</option>
          </select>

          <div className="relative z-0 w-full mb-5 group">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="user_avatar"
            >
              Upload Profile
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="user_avatar"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>

        <div
          className="flex place-items-center mb-5 mt-4"
          style={{ justifyContent: "space-between" }}
        >
          <a href="/login" className="text-blue-900 underline">
            Redirect To Login
          </a>
          <button
            type="submit"
            className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create a Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
