import React from 'react'
import styles from './Navbar.module.css'
import {Link} from 'react-router-dom'
import { RiLogoutBoxFill } from "react-icons/ri";
import { useAuthentication } from '../../hooks/useAuthentication';
const Navbar = () => {
  const {logout,authenticated}=useAuthentication()
  return (
    <>
      {authenticated?(<div className={styles.navbar}>
        <Link to={'/'}>POMODORO</Link>
        <button onClick={logout}>
          <RiLogoutBoxFill/>
        </button>
        
    </div>):(<></>)}
    </>
    
  )
}

export default Navbar