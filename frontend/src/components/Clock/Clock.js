import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './Clock.module.css'
import { useParams,useNavigate } from 'react-router-dom'
import { useTaskContext } from '../../hooks/useTaskContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useClockEvents } from '../../hooks/useClockEvents';

import { BiSolidEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

import api from '../../hooks/api';
const Clock = () => {
    const initiar = useRef();
    const {id} = useParams()
    const navigate = useNavigate()
    const task = useRef([])
    const {tasksRef} = useTaskContext()
    const [louding,setLouding] = useState(true)

    const [title,setTitle] = useState('')
    const [time,setTime] = useState(0)
    const [mainTime,setMainTime] = useState(0)
    const [short,setShort] = useState(0)
    const [long,setLong] = useState(0)

    const [minute,setMinute] = useState(0)
    const [seconde,setSeconde] = useState(0)
    const [isPaused,setIsPaused] = useState(true)
    const [currentFunction,setCurrentFunction] = useState('POMODORO')
    const {authenticated} = useAuthContext()
    const {editTaskById, deleteTaskById} = useClockEvents()
    const [count, setcount] = useState(0)

    useEffect(()=>{
        setLouding(true)
        if(tasksRef.current.length > 0 ){
            if(authenticated){
                try {
                    
                    tasksRef.current.forEach((element) => {
                        if(element._id === id){
                            setTitle(element.title)
                            setTime(element.time||0)
                            setMainTime(element.mainTime)
                            setShort(element.short)
                            setLong(element.long)
                        }
                    });
                    
                } catch (error) {}
            
            }

            if(mainTime){
                setMinute(mainTime)
                setSeconde(0)    
            }
            setLouding(false)
        }else{
            setTimeout(()=>{
                setcount(count+1)
                console.log(count)
            }, 1);
        }

        
    },[count,id,task,louding,mainTime])
    
    const contador = ()=>{setInterval(()=>{
        console.log(minute+':'+seconde)
    },5000)}


    const countDown = ()=>{

        if(minute>0 || seconde>0){
            if(seconde == 0){
                setSeconde((prev)=>prev + 59)
                setMinute((prev)=>prev - 1)
                
            }else{
                setSeconde((prev)=>prev - 1)
            }
        }else{
            pause()
        }

        
    }
    const initialize = ()=>{
         
        if(isPaused){
            setIsPaused(false)
            
            initiar.current = setInterval(()=>{
                countDown()             
            },1000)
        }else{
            pause()
        }
    }
    
    const pause = ()=>{
        setIsPaused(true)
        clearInterval(initiar.current)
    }

    const editTask = () => {
        navigate(`/edittask/${id}`)
    }

    const deleteTask = () => {
        deleteTaskById(id)
    }

  return (
    <>  
        {louding == true && (<p className={styles.louding}>Louding...</p>)}
        {louding == false && (
            
            <div className={styles.container}>
                <div className={styles.events}>
                    <button onClick={editTask} className={styles.edit}><BiSolidEdit/></button>
                    <button onClick={deleteTask} className={styles.delete}><AiFillDelete/></button>
                </div>
                <div className={styles.header}>
                    <h2>{title}</h2>
                    <p>{time}h</p>
                </div>
                <div className={styles.buttoncontainer}>
                    <button className={currentFunction === "POMODORO" ? (styles.bluebutton) : ('')} >Pomodoro</button>
                    <button className={currentFunction === "SHORT" ? (styles.bluebutton) : ('')} >Short Break</button>
                    <button className={currentFunction === "LONG" ? (styles.bluebutton) : ('')} >Long Break</button>
                </div>
                <div className={styles.timer}>
                    <h1>{minute<=9 && minute>=0 &&(<>0</>)}{minute}:{seconde<=9 && seconde>=0 && (<>0</>)}{seconde}</h1>
                </div>
                <div className={styles.buttoncontainer}>
                   <button className={styles.bluebutton} onClick={initialize}>{isPaused ? (<>Start</>):(<>Pausar</>)}</button>
                </div>
            </div>)
        }
    </>
      
    
  )
}

export default Clock