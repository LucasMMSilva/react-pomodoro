import {createContext,useRef} from 'react'

export const TaskContext = createContext()

export const TaskContextProvider = ({children}) => {
    const tasksRef = useRef([])
    const setTasks = (myTasks)=>{
        tasksRef.current = myTasks
    }
    return(
        <TaskContext.Provider value={{tasksRef,setTasks}}>
            {children}
        </TaskContext.Provider>
    )
}