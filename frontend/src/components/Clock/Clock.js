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
        setIsPaused(true)
        
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

    useEffect(()=>{
        const countDown = setInterval(()=>{
            if(!isPaused){
                if(minute>0 && seconde>0){
                    setSeconde((prevTime) => prevTime - 1)
                }else if(minute>0 && seconde === 0){
                    setSeconde((prevTime) => prevTime = 59)
                    setMinute((prevTime) => prevTime - 1)
                }else if(minute===0 && seconde >0){
                    setSeconde((prevTime) => prevTime - 1)
                }else if(minute===0 && seconde ===0){
                    setSeconde((prevTime) => prevTime = 0)
                    setMinute((prevTime) => prevTime = 0)
                    setIsPaused()
                }
                titlePage() 
            }   
        },1000)
        return () => clearInterval(countDown);
    },[isPaused,minute,seconde])

    const titlePage = () => {
        const min = minute < 10 ? '0' + minute : minute
        const sec = seconde < 10 ? '0' + seconde : seconde
        document.title = "Pomodoro - " + min +':'+sec
    }

    const editTask = () => {
        navigate(`/edittask/${id}`)
    }

    const deleteTask = () => {
        deleteTaskById(id)
    }
    
    const playPause = () =>{
        if(isPaused){
            setIsPaused(false)
        }else{
            setIsPaused(true)
        }
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
                    <p>{time>0?((time/60).toFixed(2)):(0)}h</p>
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
                   <button onClick={playPause} className={styles.bluebutton}>{isPaused?(<>Start</>):(<>Pause</>)}</button>
                </div>
            </div>)
        }
    </>
      
    
  )
}

export default Clock