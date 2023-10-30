import api from './api'
import {useEffect,useState} from 'react'
import {useNavegate} from 'react-router-dom'

export const useAuthentication = ()=>{
  const [authenticated, setAuthenticated] = useState('false')
  const {navegate} = useNavegate()

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }
  },[])

  const authUser = (data)=>{
    setAuthenticated(true)
    localStorage.setItem('token',JSON.stringify(data.token))
    navegate('/')
  }
  const logout = ()=>{
    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    navegate('/')
  }

  const authRegister = async(user)=>{
    try{
      const data = await api.post('/user/register',user)
      .then((response)=>{
        sessionStorage.setItem('token',response.data.token)
      })
      authUser(data)
    }catch(error){

    }
    

  }

  const authLogin = async(user)=>{
    await api.post('/user/login',user)
    .then((response)=>{
      console.log(response.data);
      sessionStorage.setItem('token',response.data.token)
    }).catch(function (error){
      console.log(error.response.data.errors)
    })
  }

  return {authRegister,authLogin,logout,authenticated}
}