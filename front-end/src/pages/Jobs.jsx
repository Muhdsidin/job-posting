import React, { useEffect, useState } from 'react';
import { BaseAxios } from '../utils/Axios';

function Jobs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobData, setJobData] = useState([]);

  const getAllJobs = async ()=>{
    try {
      const response = await BaseAxios.get("/user/get-job");
      console.log(response.data)
      setJobData(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    getAllJobs()
  },[])

  // const jobData = [
  //   {
  //     id: 1,
  //     title: 'Senior Frontend Developer',
  //     company: 'BlueTech Innovations',
  //     location: 'Remote',
  //     description: 'Work with a dynamic team to build high-performance web applications using React and Tailwind CSS.',
  //   },
  //   {
  //     id: 2,
  //     title: 'Backend Engineer',
  //     company: 'OceanWave Solutions',
  //     location: 'New York, NY',
  //     description: 'Develop and maintain scalable backend services and APIs using Node.js and Express.',
  //   },
  //   {
  //       id: 2,
  //       title: 'Backend Engineer',
  //       company: 'OceanWave Solutions',
  //       location: 'New York, NY',
  //       description: 'Develop and maintain scalable backend services and APIs using Node.js and Express.',
  //     },
  // ];

  const openModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b  to-blue-700 py-10 px-5" style={{marginTop:"100px"}}>
      <h1 className="text-4xl text-center text-white font-bold mb-10">Available Jobs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {jobData.map((job) => (
          <div key={job.id} className="bg-blue-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-white">{job.title}</h2>
            <p className="text-blue-300">{job.company}</p>
            <p className="text-blue-400">{job.location}</p>
            <button
              onClick={() => openModal(job)}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
            >
              More Info
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg max-w-lg mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">{selectedJob.title}</h2>
            <p className="mb-4">{selectedJob.description}</p>
            <button
              onClick={closeModal}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobs;
