import React from 'react'
import styles from './Welcome.module.css'
import { IoTrashBinOutline } from "react-icons/io5";
import {useAuthContext} from '../../hooks/useAuthContext'
const Welcome = () => {
  const {message} = useAuthContext()
  return (
    <div className={styles.emphasis}>
        {message && message.type === 'DELETETASK' && <div>
          <IoTrashBinOutline />
          <p>{message.msg}</p>
        </div>}
        <h1>Welcome back</h1>
        <p>Feel free to create new goals, but don't forget to focus on what's really important.</p>
    </div>
  )
}

export default Welcome