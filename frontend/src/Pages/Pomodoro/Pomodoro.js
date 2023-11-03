import { useLayoutEffect,useRef, useState } from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import styles from './Pomodoro.module.css'
import api from '../../hooks/api'
import {useAuthContext} from '../../hooks/useAuthContext'
const Pomodoro = ({children}) => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const tasks = useRef([])
  const {authenticated, setAuthenticated} = useAuthContext()
  const token = localStorage.getItem('token')
  
  useLayoutEffect(()=>{
    setLoading(true)
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
          tasks.current = response.data
        }).catch((error)=>{
          console.log(error.response.data.errors)
        })
      }
    } catch (error) {
      console.log(error.data)
    }
    setLoading(false)
    
  },[token,authenticated,tasks.current])
  
  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>

          <NavLink to={'/createnewtask'} className={styles.newtask }>{'Create new task'}</NavLink>

          {tasks && <p>Teste</p>}
          {!loading ? ( tasks.current.map((task)=>(
            <NavLink className={({isActive})=>isActive ? styles.active : ''} key={task._id} to={`/task/${task._id}`}>{task.title}</NavLink>
          )) ) : 
          ( <p>Loading</p> ) }

        </div>
        <div className={styles.pomodoro}>
          {children}
        </div>
    </div>
  )
}

export default Pomodoro