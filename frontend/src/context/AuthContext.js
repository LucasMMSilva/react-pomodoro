import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    
    const token = localStorage.getItem('token')
    const hasToken = token ? true : false
    const [message,setMessage] = useState({})
    const [authenticated, setAuthenticated] = useState(hasToken) 

    return (
        <AuthContext.Provider value={{authenticated,setAuthenticated,message,setMessage}}>
            {children}
        </AuthContext.Provider>
    )
}