import { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Pomodoro.module.css'
import Clock from '../../components/Clock/Clock'
import CreateTask from '../../components/CreateTask/CreateTask'
const Pomodoro = ({children}) => {
  const [tasks,setTasks] = useState([
    {id:'6d54f6d65f', name:'Estudar Javascript',pomodoro:25,short:5,long:15,uid:'5ff4'},
    {id:'5d54f6d66f', name:'Estudar C++',pomodoro:25,short:5,long:15,uid:'5ff4'},
    {id:'4d54f6d45f', name:'Estudar Matematica',pomodoro:25,short:5,long:15,uid:'5ff4'}
  ])
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