import api from './api'
import { useAuthContext } from './useAuthContext'
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useTaskContext } from './useTaskContext'
export const useTaskAuth = () => {
    const {authenticad,setAuthenticated} = useAuthContext()
    const {tasksRef} = useTaskContext()
    const [loading,setLoading] = useState(true)
    const [token,setToken] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        setLoading(true)
        setToken(localStorage.getItem('token'))
        if(token){
          api.defaults.headers.Authorization = `Bearer ${token}`
          setAuthenticated(true)
        }
        setLoading(false)
    },[])

    const createTask = async(task) =>{
        var data;
        const taskData = task
        if(token){
            await api.post('/task/createtask',taskData,{
                headers:{
                  authorization:`Bearer ${JSON.parse(token)}`
                }})
                .then((response)=>{
                    tasksRef.current.push(response.data)
                    navigate(`/task/${response.data._id}`)
                    
                }).catch((err)=>{
                    console.log(err.response.data.errors)
                })
        }
    }

    return {createTask}
}