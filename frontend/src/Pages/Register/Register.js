import React, { useEffect } from 'react'
import styles from './Register.module.css'
import InputLabel from '../../components/InputLabel/InputLabel'
import {useNavigate, Link} from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useAuthContext } from '../../hooks/useAuthContext'
const Register = () => {

  const navigate = useNavigate()

  const {authRegister} = useAuthentication()
  const {authenticated,message} = useAuthContext()

  useEffect(()=>{
    document.title = "Pomodoro - Register" 
    if(authenticated){
      navigate('/')
    }
  },[authenticated])
  
  const handleSubmit = (e)=>{
    e.preventDefault()
    const user = {
      username:e.target[0].value,
      email:e.target[1].value,
      password:e.target[2].value
    }
    authRegister(user)
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
                {message && message.type === 'REGISTER username' && <p className={styles.error}>{message.errors}</p>}
                <InputLabel label='E-mail' name='email' type='email' placeholder='ex. lucasmanoel@mail.com'/>
                {message && message.type === 'REGISTER email' && <p className={styles.error}>{message.errors}</p>}
                <InputLabel label='Password' name='password' type='password' placeholder='The password must be longer than 6 characters.'/>
                {message && message.type === 'REGISTER password' && <p className={styles.error}>{message.errors}</p>}
                <button type='submit'>Register</button>
            </form>
            <p className={styles.redirect}>Already have an account? <Link to='/login'>Click here</Link>.</p>
        </div>
    </div>
  )
}

export default Register