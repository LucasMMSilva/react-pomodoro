import { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Pomodoro.module.css'
import Clock from '../../components/Clock/Clock'
import CreateTask from '../../components/CreateTask/CreateTask'
import api from '../../hooks/api'
const Pomodoro = ({children}) => {
  const [tasks,setTasks] = useState([])

  
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