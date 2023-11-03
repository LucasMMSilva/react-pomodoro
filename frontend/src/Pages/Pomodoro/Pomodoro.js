import { useEffect,useRef, useState } from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import styles from './Pomodoro.module.css'
import api from '../../hooks/api'
import {useAuthContext} from '../../hooks/useAuthContext'
const Pomodoro = ({children}) => {

  const navigate = useNavigate()
  const tasks = useRef([])
  const [loading,setLoading] = useState(true)
  const {authenticated, setAuthenticated} = useAuthContext()
  const token = localStorage.getItem('token')
  
  useEffect(()=>{
    if(!authenticated){
      navigate('/login')
    }

    if(loading === true){
      try {
        if(token){

          const getTasks = async()=>{

            await api.get('/task/tasks',{
            headers:{
              authorization:`Bearer ${JSON.parse(token)}`

            }
            }).then((response)=>{
              tasks.current = response.data
              setLoading(false)
            }).catch((error)=>{
              console.log(error.response.data.errors)
            })

          }
          getTasks()
        }
      } catch (error) {
        
      }
    }
    
  },[token,authenticated,loading])
  
  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>

          

          <NavLink to={'/createnewtask'} className={styles.newtask }>{'Create new task'}</NavLink>

          {!loading ? tasks.current.map((task)=>(
            <NavLink className={({isActive})=>isActive ? styles.active : ''} key={task._id} to={`/task/${task._id}`}>{task.title}</NavLink>
          )):
            <p>Loading...</p>
          }

        </div>
        <div className={styles.pomodoro}>
          {children}
        </div>
    </div>
  )
}

export default Pomodoro