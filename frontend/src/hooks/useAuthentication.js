import api from './api'
import {useEffect,useState} from 'react'
export const useAuthentication = ()=>{

  const authRegister = async(user)=>{
    await api.post('/user/register',user)
    .then((response)=>{
      console.log(response.data);
      sessionStorage.setItem('user',response.data.token)
    })
    .catch(function (error) {
      console.log(error.response.data.errors);
    });
  }

  const authLogin = async(user)=>{
    await api.post('/user/login',user)
    .then((response)=>{
      console.log(response.data);
      sessionStorage.setItem('user',response.data.token)
    }).catch(function (error){
      console.log(error.response.data.errors)
    })
  }

  return {authRegister,authLogin}
}