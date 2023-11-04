import { TaskContext } from "../context/TaskContext";
import { useContext } from "react";

export const useTaskContext = ()=>{
    const context = useContext(TaskContext)
    return context
}