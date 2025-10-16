import { createContext, Dispatch, SetStateAction } from "react"

export interface IAuth {
  auth: boolean
  setAuth: Dispatch<SetStateAction<boolean>>
}

const AuthContext =  createContext<IAuth>({auth:false, setAuth:() => {
  
}})


export default AuthContext