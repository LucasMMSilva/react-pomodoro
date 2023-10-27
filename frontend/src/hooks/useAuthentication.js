import api from './api'
import {useEffect,useState} from 'react'
export const useAuthentication = ()=>{
  const [error , setError] = useState(null)
  const [louding, setLoading] = useState(null)


  const registerNewUser = async(user)=>{
    const test = {username:'bilu11',email:'lucasmanoelm2elo11@gmail.com',password:'5465465465'}
    //console.log(user)
    await api.post('/user/register',test).then((response)=>{console.log(response.data)}).catch(function (error) {
      console.error(error);
    });
  
  }
  return {registerNewUser}
}