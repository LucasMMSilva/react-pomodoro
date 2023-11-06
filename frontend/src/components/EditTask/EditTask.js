import { useTaskAuth } from '../../hooks/useTaskAuth'
import InputLabel from '../InputLabel/InputLabel'
import styles from './EditTask.module.css'
import { useParams } from 'react-router-dom'
import { useTaskContext } from '../../hooks/useTaskContext' 
import { useEffect, useState } from 'react'

const EditTask = ()=>{

    const {id} = useParams()
    const {tasksRef} = useTaskContext()

    const [task, setTask] = useState([])
    const [louding,setLoading] = useState(true)

    useEffect(()=>{
        setLoading(true)
        tasksRef.current.forEach((element)=>{
            if(element._id === id){
                setTask(element)
                setLoading(false)
            }
        })
    },[])

    const {editTask} = useTaskAuth()

    const handleSubmit = (e) => {

        e.preventDefault()

        const task = {
            title:e.target[0].value,
            mainTime:e.target[1].value,
            short:e.target[2].value,
            long:e.target[3].value
        }

        editTask(task)
    }

    return(
        <>
            {!louding && (<div className={styles.container}>
                <div className={styles.header}>
                    <h2>Create new task</h2>
                    <p>Configure your new task</p>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <InputLabel label='Title' name='title' type='text' placeholder='Enter the task name' value={task.title}/>
                        <p className={styles.timerconfigheader}>Timer settings <span>{'( In minutes )'}</span></p>
                        <div className={styles.timerconfig}>
                            <InputLabel label='Pomodoro Time' name='mainTimer' type='number' value={task.mainTime}/>
                            <InputLabel label='Short Break' name='short' type='number' value={task.short}/>
                            <InputLabel label='Long Break' name='long' type='number' value={task.long}/>
                        </div>
                        <button>Create task</button>
                    </form>
                </div>
            </div>)}
        </>
        
    )
}
export default EditTask