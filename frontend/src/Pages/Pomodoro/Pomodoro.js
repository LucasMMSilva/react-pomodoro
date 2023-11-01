import { useEffect,useLayoutEffect, useState } from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import styles from './Pomodoro.module.css'
import Clock from '../../components/Clock/Clock'
import CreateTask from '../../components/CreateTask/CreateTask'
import api from '../../hooks/api'
import {useAuthentication} from '../../hooks/useAuthentication'
const Pomodoro = ({children}) => {
  const navigate = useNavigate()
  const {authenticated} = useAuthentication()
  const [tasks, setTasks] = useState([])
  
  
  useLayoutEffect(()=>{
    if(authenticated){
      console.log(authenticated)
      navigate('/login')
    }
  },[])

  const token = localStorage.getItem('token')
  
  useEffect(()=>{
    try {
      if(token){
      api.get('/task/tasks',{
      headers:{
        Authorization:`Bearer ${JSON.parse(token)}`
      }
      }).then((response)=>{
        setTasks(response.data.tasks)
        console.log(tasks)
      })
    }
    } catch (error) {
      
    }
    
  },[])
  
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