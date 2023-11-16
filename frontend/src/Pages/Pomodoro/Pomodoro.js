import { useLayoutEffect,useRef, useState } from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import styles from './Pomodoro.module.css'
import api from '../../hooks/api'
import {useAuthContext} from '../../hooks/useAuthContext'
import { useTaskContext } from '../../hooks/useTaskContext'
const Pomodoro = ({children}) => {

  const navigate = useNavigate()

  const {tasksRef} = useTaskContext()
  const {authenticated} = useAuthContext()

  const token = localStorage.getItem('token')

  const [loading,setLoading] = useState(true)



  useLayoutEffect(()=>{
    if(!authenticated){
      navigate('/login')
    }

    document.title = "Pomodoro" 

    if(loading === true){
      try {
        if(token){

          const getTasksRef = async()=>{

            await api.get('/task/tasks',{
            headers:{
              authorization:`Bearer ${JSON.parse(token)}`
            }
            }).then((response)=>{
              tasksRef.current = response.data
              setLoading(false)
            }).catch((error)=>{
              

            })

          }
          getTasksRef()
        }
      } catch (error) {
        
      }
    }
    
  },[token,authenticated,loading])
  
  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>

          

          <NavLink to={'/createnewtask'} className={styles.newtask }>{'Create new task'}</NavLink>

          {!loading ? tasksRef.current.map((task)=>(
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