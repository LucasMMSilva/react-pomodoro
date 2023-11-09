import { useEffect } from 'react'
import { useTaskAuth } from '../../hooks/useTaskAuth'
import InputLabel from '../InputLabel/InputLabel'
import styles from './CreateTask.module.css'


const CreateTask = ()=>{

    useEffect(()=>{
        document.title = "Pomodoro" 
    },[])

    const {createTask} = useTaskAuth()

    const handleSubmit = (e) => {

        e.preventDefault()

        const task = {
            title:e.target[0].value,
            mainTime:e.target[1].value,
            short:e.target[2].value,
            long:e.target[3].value
        }

        createTask(task)
    }

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Create new task</h2>
                <p>Configure your new task</p>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <InputLabel label='Title' name='title' type='text' placeholder='Enter the task name'/>
                    <p className={styles.timerconfigheader}>Timer settings <span>{'( In minutes )'}</span></p>
                    <div className={styles.timerconfig}>
                        <InputLabel label='Pomodoro Time' name='mainTimer' type='number' value='25'/>
                        <InputLabel label='Short Break' name='short' type='number' value='5'/>
                        <InputLabel label='Long Break' name='long' type='number' value='15'/>
                    </div>
                    <button>Create task</button>
                </form>
            </div>
        </div>
    )
}
export default CreateTask