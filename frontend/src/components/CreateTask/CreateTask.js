import InputLabel from '../InputLabel/InputLabel'
import styles from './CreateTask.module.css'
const CreateTask = ()=>{
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Create new task</h2>
                <p>Configure your new task</p>
            </div>
            <div>
                <form>
                    <InputLabel label='Name' name='name' type='text' placeholder='Enter the task name'/>
                    <p className={styles.timerconfigheader}>Timer settings <span>{'( In minutes )'}</span></p>
                    <div className={styles.timerconfig}>
                        <InputLabel label='Pomodoro' name='pomodoro' type='number' value='25'/>
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