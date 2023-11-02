import React, { useLayoutEffect, useState } from 'react'
import styles from './Login.module.css'
import InputLabel from '../../components/InputLabel/InputLabel'
import {Link, useNavigate} from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication'
const Login = () => {
  
  const {authLogin} = useAuthentication()
  const navigate = useNavigate()


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
                <InputLabel label='Password' name='password' type='password' placeholder='The password must be longer than 6 characters.'/>
                <button type='submit'>Login</button>
            </form>
            <p className={styles.redirect}>Don't have an account yet? <Link to='/register'>Click here</Link>.</p>
        </div>
    </div>
  )
}

export default Login