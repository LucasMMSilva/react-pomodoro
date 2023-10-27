import React from 'react'
import styles from './Navbar.module.css'
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <div className={styles.navbar}>
        <Link to={'/'}>POMODORO</Link>
        
    </div>
  )
}

export default Navbar