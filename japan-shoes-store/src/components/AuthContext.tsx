"use client"
import AuthContext from "@/contexts/AuthContext"
import React, { useState } from "react"



const AuthComponent = ({children}:{children:React.ReactNode}) => {
  const [auth, setAuth] = useState(false)
  
  return (
    <>
    <AuthContext.Provider value={{auth, setAuth}}> 

    {children}
    </AuthContext.Provider>
    
    </>
  )
}

export default AuthComponent