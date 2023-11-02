import { useEffect,useLayoutEffect, useState } from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import styles from './Pomodoro.module.css'
import api from '../../hooks/api'
import {useAuthContext} from '../../hooks/useAuthContext'
const Pomodoro = ({children}) => {

  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const {authenticated, setAuthenticated} = useAuthContext()
  const token = localStorage.getItem('token')


  
  useEffect(()=>{
    if(!authenticated){
      navigate('/login')
    }
    try {
      if(token){
        api.get('/task/tasks',{
        headers:{
          Authorization:`Bearer ${JSON.parse(token)}`
        }
        }).then((response)=>{
          setTasks(response.data.tasks)
          console.log(response.data)
        })
      }
    } catch (error) {
      
    }
    
  },[token,authenticated])
  
  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>
          <NavLink to={'/createnewtask'} className={styles.newtask }>{'Create new task'}</NavLink>
          {tasks.map((task)=>(
            <NavLink className={({isActive})=>isActive && styles.active} key={task.id} to={`/task/${task.id}`}>{task.name}</NavLink>
          ))}
        </div>
        <div className={styles.pomodoro}>
          {children}
        </div>
    </div>
  )
}

export default Pomodoro