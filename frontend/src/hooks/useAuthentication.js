import api from './api'
import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
export const useAuthentication = ()=>{
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()


  useEffect(()=>{
    setLoading(true)
    const token = localStorage.getItem('token')
    if(token){
      api.defaults.headers.Authorization = `Bearer ${token}`

    }
    setLoading(false)
  },[])

  const authUser = (data)=>{

    localStorage.setItem('token',JSON.stringify(data.token))
    console.log(localStorage.getItem('token'))
    navigate('/')
  }

  const logout = ()=>{
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    navigate('/login')
  }

  const authRegister = async(user)=>{
    try{
      const data = await api.post('/user/register',user)
      .then((response)=>{
        localStorage.setItem('token',response.data.token)
      })
      authUser(data)
    }catch(error){

    }
    
  }

  const authLogin = async(user)=>{
    try {
      const data =await api.post('/user/login',user)
      .then((response)=>{
        console.log(response.data);
        localStorage.setItem('token',response.data.token)
      }).catch(function (error){
        console.log(error.response.data.errors)
      })
      authUser(data)

    } catch (error) {
      
    }

  }

  return {authRegister,authLogin,logout}
}