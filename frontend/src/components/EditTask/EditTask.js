import { useTaskAuth } from '../../hooks/useTaskAuth'
import InputLabel from '../InputLabel/InputLabel'
import styles from './EditTask.module.css'
import { useParams,useNavigate } from 'react-router-dom'
import { useTaskContext } from '../../hooks/useTaskContext' 
import { useEffect, useLayoutEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useAuthentication } from '../../hooks/useAuthentication'
const EditTask = ()=>{

    const {id} = useParams()
    const {tasksRef} = useTaskContext()

    const [task, setTask] = useState([])
    const [louding,setLouding] = useState(true)
    const [count,setCount] = useState(0)
    const [isAdept,setIsAdept] = useState(false)
    
    const {authenticated} = useAuthContext()
    const {verifyUserId} = useAuthentication()
    const navigate = useNavigate()

    useLayoutEffect(()=>{
        const verify = verifyUserId(id)
        verify.then((response)=>{
            if(!response){
                navigate('/')
            }else{
                setIsAdept(true)
            }
        })
    },[])

    useEffect(()=>{
        setLouding(true)
        if(isAdept){

            if(tasksRef.current.length > 0 ){
                if(authenticated){
                    try {
                        
                        tasksRef.current.forEach((element) => {
                            if(element._id === id){
                                setTask(element)
                            }
                        });
                        
                    } catch (error) {}
                    setLouding(false)
                }

                
            }else{
                setTimeout(()=>{
                    setCount(count+1)
                    console.log(count)
                }, 1);
            }

        }
        
    },[count,id,task,louding,isAdept])
    

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
            {!louding ? (<div className={styles.container}>
                <div className={styles.header}>
                    <h2>Edit your task</h2>
                    <p>Configure your task</p>
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
                        <button>Edit task</button>
                    </form>
                </div>
            </div>):(<p className={styles.louding}>Louding...</p>)}
        </>
        
    )
}
export default EditTask