import api from './api'
import {useEffect,useState} from 'react'
import {useNavigate, useLocation } from 'react-router-dom'
import { useAuthContext } from './useAuthContext'
import { useTaskContext } from './useTaskContext'
import { useFlashMessage } from './useFlashMessage'

export const useAuthentication = ()=>{
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const {authenticated,setAuthenticated} = useAuthContext()
  const {tasksRef} = useTaskContext()
  const {setFlashMessage} = useFlashMessage()
  const location = useLocation()
  const path = location.pathname
  useEffect(()=>{
    if(!authenticated){
      if(path === '/login' || path === '/register'){

      }else{
        navigate('/login')
      }
      
    }
    setLoading(true)
    const token = localStorage.getItem('token')
    if(token){
      api.defaults.headers.Authorization = `Bearer ${token}`
      setAuthenticated(true)
    }
    setLoading(false)
  },[])

  const authUser = async (data)=>{
    localStorage.setItem('token',JSON.stringify(data.token))
    localStorage.setItem('userid',JSON.stringify(data._id))
    setAuthenticated(true)
    navigate('/')
  }

  const logout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('userid')
    api.defaults.headers.Authorization = undefined
    setAuthenticated(false)
    tasksRef.current = [{}]
    navigate('/login')
  }

  const authRegister = async(user)=>{
    try{
      var data 
      await api.post('/user/register',user)
      .then((response)=>{
          data = response.data
          authUser(data)
      }).catch((err)=>{
          setFlashMessage(err.response.data)
      })
      
    }catch(error){
      navigate('/error')
    }    
  }

  const authLogin = async(user)=>{
    try {
      var data 
      await api.post('/user/login',user)
      .then((response)=>{
         data = response.data
         authUser(data)
      }).catch((err)=>{
        setFlashMessage(err.response.data)
      })
      
    } catch (error) {
      navigate('/error')
    }
  }

  const verifyUserId = async(id)=>{ 
    let data 
    const userId = JSON.parse(localStorage.getItem('userid'))
    const token = localStorage.getItem('token')
    
    if(token){
      await api.get(`/task/${id}`,{
      headers:{
        authorization:`Bearer ${JSON.parse(token)}`
      }})
      .then((response)=>{
        data = response.data.userId
      }).catch((err)=>{
        // flashMessage
      })
    }

    return data === userId ? true : false
  }

  return {authRegister,authLogin,logout,verifyUserId}
}