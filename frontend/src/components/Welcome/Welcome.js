import React from 'react'
import styles from './Welcome.module.css'
const Welcome = () => {
  return (
    <div className={styles.emphasis}>
        <h1>Welcome back</h1>
        <p>Feel free to create new goals, but don't forget to focus on what's really important.</p>
    </div>
  )
}

export default Welcome