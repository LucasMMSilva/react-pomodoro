import api from './api'
import { useAuthContext } from './useAuthContext'
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useTaskContext } from './useTaskContext'
export const useTaskAuth = () => {
    const {setAuthenticated} = useAuthContext()
    const {tasksRef} = useTaskContext()
    const [token,setToken] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        setToken(localStorage.getItem('token'))
        if(token){
          api.defaults.headers.Authorization = `Bearer ${token}`
          setAuthenticated(true)
        }
    },[])

    const createTask = async(task) =>{
        const taskData = task
        if(token){
            await api.post('/task/createtask/',taskData,{
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

    const editTask = async(task) =>{
        const taskData = task
        if(token){
            await api.put(`/task/${taskData.id}`,taskData,{
                headers:{
                  authorization:`Bearer ${JSON.parse(token)}`
                }})
                .then((response)=>{

                    tasksRef.current.forEach((element,index) => {
                        if(element._id === response.data._id){
                            tasksRef.current[index] = response.data
                        }
                    });
                    navigate(`/task/${response.data._id}`)
                    
                }).catch((err)=>{
                    console.log(err.response.data.errors)
                })
        }
    }

    const addTimeTraveler = async(task) =>{
        const taskData = task
        if(token){
            await api.put(`/task/${taskData.id}`,taskData,{
                headers:{
                  authorization:`Bearer ${JSON.parse(token)}`
                }})
                .then((response)=>{
                    
                }).catch((err)=>{
                    console.log(err.response.data.errors)
                })
        }
    }



    return {createTask,editTask,addTimeTraveler}
}