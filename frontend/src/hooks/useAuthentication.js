import api from './api'
import {useEffect,useState} from 'react'
export const useAuthentication = ()=>{
  const [error , setError] = useState(null)
  const [louding, setLoading] = useState(null)


  const registerNewUser = async(user)=>{
    console.log(user)
    await api.post('/user/register',user)
    .then((response)=>{
      sessionStorage.setItem('user',response.data.token)
    })
    .catch(function (error) {
      console.error(error);
    });
  
  }
  return {registerNewUser}
}