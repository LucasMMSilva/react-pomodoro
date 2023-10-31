import api from './api'
import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'

export const useAuthentication = ()=>{
  const [authenticated, setAuthenticated] = useState(false)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    setLoading(true)
    const token = localStorage.getItem('token')
    if(token){
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }
    setLoading(false)
  },[])

  const authUser = (data)=>{
    setAuthenticated(true)
    localStorage.setItem('token',JSON.stringify(data.token))
    navigate('/')
  }
  const logout = ()=>{
    setAuthenticated(false)
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

  return {authRegister,authLogin,logout,authenticated}
}