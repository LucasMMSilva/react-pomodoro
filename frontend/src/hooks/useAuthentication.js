import api from './api'
import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuthContext } from './useAuthContext'


export const useAuthentication = ()=>{
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()

  const {authenticated,setAuthenticated} = useAuthContext()

  useEffect(()=>{
    setLoading(true)
    const token = localStorage.getItem('token')
    if(token){
      api.defaults.headers.Authorization = `Bearer ${token}`
      setAuthenticated(true)
    }
    setLoading(false)
  },[])

  const authUser = (data)=>{

    localStorage.setItem('token',JSON.stringify(data.token))
    console.log(data)
    setAuthenticated(true)
    //navigate('/')
  }

  const logout = ()=>{
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    setAuthenticated(false)
    navigate('/login')
  }

  const authRegister = async(user)=>{
    try{
      var data 
      await api.post('/user/register',user)
      .then((response)=>{
         data = response.data
      })
      authUser(data)
    }catch(error){

    }
    
  }

  const authLogin = async(user)=>{
    try {
      var data 
      await api.post('/user/login',user)
      .then((response)=>{
         data = response.data
      })
      authUser(data)
    } catch (error) {
      
    }

  }

  return {authRegister,authLogin,logout}
}