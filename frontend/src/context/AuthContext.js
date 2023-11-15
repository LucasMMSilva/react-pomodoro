import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    
    const token = localStorage.getItem('token')
    const hasToken = token ? true : false
    const [error,setError] = useState({error:'',type:'',time:0})
    const [authenticated, setAuthenticated] = useState(hasToken) 

    return (
        <AuthContext.Provider value={{authenticated,setAuthenticated,error,setError}}>
            {children}
        </AuthContext.Provider>
    )
}