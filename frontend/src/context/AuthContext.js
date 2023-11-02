import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    
    const token = localStorage.getItem('token')
    const hasToken = token ? true : false
    const [authenticated, setAuthenticated] = useState(hasToken) 

    return (
        <AuthContext.Provider value={{authenticated,setAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}