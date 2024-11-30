import { createContext, useEffect, useState } from "react"
import { BaseAxios } from "../utils/Axios"

export const UserContext = createContext()

export const  UserProvider =({ children })=>{
    let name = " sidin"
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
    

    
    return <UserContext.Provider value={user} >{children}</UserContext.Provider>
}