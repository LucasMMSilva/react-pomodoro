import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './Clock.module.css'
import { useParams } from 'react-router-dom'
import api from '../../hooks/api';
const Clock = () => {
    const initiar = useRef();
    const {id} = useParams()
    const task = useRef([])
    const [louding,setLouding] = useState(true)
    const [minute,setMinute] = useState(0)
    const [seconde,setSeconde] = useState(0)
    const [isPaused,setIsPaused] = useState(true)
    const [currentFunction,setCurrentFunction] = useState('POMODORO')
    const token = localStorage.getItem('token')

    useLayoutEffect(()=>{
        try {
          if(token){
          api.get(`/task/${id}`,{
          headers:{
            Authorization:`Bearer ${JSON.parse(token)}`
          }
          }).then((response)=>{
            task.current = response.data
            console.log(task.current.title)
          })
        }
        } catch (error) {
          
        }
        
      },[id])

    useEffect(()=>{
        setLouding(true)
        //contador()
        
            if(task){
                setMinute(task.current.mainTime)
                setSeconde(0)
            }
       
       setLouding(false)
       //return contador()
    },[id,task])

    /*const contador = ()=>{setInterval(()=>{
        console.log(minute+':'+seconde)
    },5000)}*/

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
  return (
    <>  
        {louding == true && (<p>Carregando</p>)}
        {louding == false && (
            
            <div className={styles.container}>
                
                <div className={styles.header}>
                    <h2>{task.current.title}</h2>
                    <p>5:00h</p>
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