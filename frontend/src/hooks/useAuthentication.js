import api from './api'
import {useEffect,useState} from 'react'
export const useAuthentication = ()=>{
  const [error , setError] = useState(null)
  const [louding, setLoading] = useState(null)


  const registerNewUser = async(user)=>{
    await api.post('/user/register',user)
  }
  return {registerNewUser}
}