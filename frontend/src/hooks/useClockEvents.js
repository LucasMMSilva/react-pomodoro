import api from './api'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './useAuthContext'
import { useTaskContext } from './useTaskContext'
export const useClockEvents = () => {  

    const navigate = useNavigate()
    
    const {tasksRef} = useTaskContext()

    const token = localStorage.getItem('token')

    const deleteTaskById = async(id) =>{
        await api.delete(`/task/${id}`,{
            headers:{
              authorization:`Bearer ${JSON.parse(token)}`
            }}
        ).then(()=>{
            let newTasks = []
            tasksRef.current.forEach(element => {
                if(element._id !== id){
                    newTasks.push(element)
                }
            });
            tasksRef.current = newTasks
            navigate('/')
        }).catch((err)=>{
            // Flash Message
        })

    }

    return {deleteTaskById}
}