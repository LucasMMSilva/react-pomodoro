import {useEffect} from 'react'
import styles from './ErrorPage.module.css'
const ErrorPage = () => {
  useEffect(()=>{
    document.title = "Pomodoro" 
  },[])
  return (
    <div className={styles.emphasis}>
        <h1>It looks like something went wrong</h1>
        <p>I apologize, please try again later.</p>
    </div>
  )
}

export default ErrorPage