import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/User'
import { BaseAxios } from '../../utils/Axios'

function Aside() {
  // const user = useContext(UserContext)
  // console.log(user)
  const [user , setUser] = useState({})
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
          setUser(response.data)
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(()=>{
      getUserName()
  },[])
  
  return (
    <aside className="bg-slate-200 border-spacing-10" style={{ display: "flex", flexDirection: "column" , alignItems:"center", width: "300px", height: "500px", marginTop: "100px"  , marginLeft:"30px" , borderRadius:"10px" }}>
        <div className=" mt-10"> 
          <img src={user.profile} alt="" className="rounded-full w-36 h-36"  />
        
        </div>

        <div>
        <h4 className="text-xl font-bold mt-2">{user.email}</h4>
        </div>
      </aside>
  )
}

export default Aside