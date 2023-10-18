require('dotenv').config()
const express = require('express')
const app = express()

const cors = require('cors')
const router = require('./routes/routes')

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const port = 5000

app.use('/',router)

app.listen(port,()=>{
    console.log('conectado!')
})