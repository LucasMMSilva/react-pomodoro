
import {useEffect,useState} from 'react'
export const useAuthentication = ()=>{
  const [error , setError] = useState(null)
  const [louding, setLoading] = useState(null)

  const auth = getAuth()

  const registerNewUser =(user)=>{
    
  }
  return {}
}