import {createContext,useRef} from 'react'

export const TaskContext = createContext()

export const TaskContextProvider = ({children}) => {
    const tasks = useRef([])
    return(
        <TaskContext.Provider value={tasks}>
            {children}
        </TaskContext.Provider>
    )
}