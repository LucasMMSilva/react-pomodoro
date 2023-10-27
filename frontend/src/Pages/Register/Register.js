import React, { useEffect } from 'react'
import styles from './Register.module.css'
import InputLabel from '../../components/InputLabel/InputLabel'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import api from '../../hooks/api'
import { useAuthentication } from '../../hooks/useAuthentication'

const Register = () => {
  const {registerNewUser} = useAuthentication()
  const [user,setUser] = useState({})
  
  const handleSubmit = (e)=>{
    e.preventDefault()
    setUser({
      username:e.target[0].value,
      email:e.target[1].value,
      password:e.target[2].value
    })
    
    console.log(user)
    //registerNewUser(user)
      
  }
  return (
    <div className={styles.container}>
        <div className={styles.image}>
          <p>This is an image generated by artificial intelligence</p>
        </div>
        <div className={styles.formcontainer}>
          <h1 className={styles.logo}>Pomodoro</h1>
            <div className={styles.header}>
              <h1>Register</h1>
              <p>Register your user profile.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <InputLabel label='Username' name='username' type='text' placeholder='ex. lucasmanoel'/>
                <InputLabel label='E-mail' name='email' type='email' placeholder='ex. lucasmanoel@mail.com'/>
                <InputLabel label='Password' name='password' type='password' placeholder='The password must be longer than 6 characters.'/>
                <button type='submit'>Register</button>
            </form>
            <p className={styles.redirect}>Already have an account? <Link to='/login'>Click here</Link>.</p>
        </div>
    </div>
  )
}

export default Register