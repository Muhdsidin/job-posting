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
      <h1 className="text-4xl text-center text-blue-700 font-bold mb-10">Available Jobs</h1>
     
      {jobData.length === 0 ? <h5 className=" text-center text-blue-700 font-bold mb-10">No job is Listed in this time  </h5> : 
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
       </div>}

    

      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50  flex  items-center z-50">
          <div className="bg-white rounded-lg max-w-lg flex  mx-auto p-6">
            <div>
            <h2 className="text-2xl font-semibold mb-4">{selectedJob.title}</h2>
            <p className="mb-4">{selectedJob.description}</p>
            </div>
            <div>
            <button
              onClick={closeModal}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500"
            >
              Close
            </button>

            <button className="flex justify-center items-center gap-2 px-2 hover:bg-blue-50 rounded-full p-1 mt-10">
                <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>Add  </span>
              </button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobs;
