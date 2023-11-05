import api from './api'
import { useAuthContext } from './useAuthContext'
import {useState,useEffect} from 'react'

export const useTaskAuth = () => {
    const {authenticad,setAuthenticated} = useAuthContext()
    const [loading,setLoading] = useState(true)
    const [token,setToken] = useState('')
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
                    console.log(response.data)
                }).catch((err)=>{
                    console.log(err.response.data.errors)
                })
        }
    }

    return {createTask}
}