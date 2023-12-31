import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import InputLabel from '../../components/InputLabel/InputLabel'
import {Link, useNavigate} from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFlashMessage } from '../../hooks/useFlashMessage'
const Login = () => {

  const navigate = useNavigate()

  const {authLogin} = useAuthentication()
  const {authenticated,message} = useAuthContext()
  const {clearMessage} = useFlashMessage()

  useEffect(()=>{
    clearMessage()
    document.title = "Pomodoro - Login" 
    if(authenticated){
      navigate('/')
    }
  },[authenticated])

  const handleSubmit = (e)=>{
    e.preventDefault()
    const user = {
      email:e.target[0].value,
      password:e.target[1].value
    }
    authLogin(user)
  }

  return (
    <div className={styles.container}>
        <div className={styles.image}>
          <p>This is an image generated by artificial intelligence</p>
        </div>
        <div className={styles.formcontainer}>
          <h1 className={styles.logo}>Pomodoro</h1>
            <div className={styles.header}>
              <h1>Login</h1>
              <p>Welcome back.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <InputLabel label='E-mail' name='email' type='email' placeholder='ex. lucasmanoel@mail.com'/>
                {message && message.type === 'LOGIN email' && <p className={styles.error}>{message.errors}</p>}
                <InputLabel label='Password' name='password' type='password' placeholder='The password must be longer than 6 characters.'/>
                {message && message.type === 'LOGIN password' && <p className={styles.error}>{message.errors}</p>}
                <button type='submit'>Login</button>
            </form>
            <p className={styles.redirect}>Don't have an account yet? <Link to='/register'>Click here</Link>.</p>
        </div>
    </div>
  )
}

export default Login