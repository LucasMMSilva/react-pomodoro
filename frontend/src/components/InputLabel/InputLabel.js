import React, { useEffect, useState } from 'react'
import styles from './InputLabel.module.css'
const InputLabel = (props) => {
  const [valueChange, setValueChange] = useState(props.value||'')

  useEffect(()=>{
    setValueChange(props.value || '')
  },[props.value])

  const handleChange = (e)=>{
    e.preventDefault()
    setValueChange(e.target.value||'')
    console.log(e.target.value)
  }
  
  return (
    <div className={styles.content}>
        <label>{props.label}</label>
        <input type={props.type} name={props.name} placeholder={props.placeholder} onChange={handleChange} value={valueChange}/>
    </div>
  )
}

export default InputLabel