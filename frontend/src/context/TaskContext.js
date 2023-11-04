import {createContext,useRef} from 'react'

export const TaskContext = createContext()

export const TaskContextProvider = ({children}) => {
    const tasksRef = useRef([])
    
    return(
        <TaskContext.Provider value={{tasksRef}}>
            {children}
        </TaskContext.Provider>
    )
}