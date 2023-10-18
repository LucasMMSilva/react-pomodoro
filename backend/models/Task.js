const mongoose = require('../config/db')
const {Schema} = mongoose

const taskSchema = new Schema({
    title:String,
    mainTime:Number,
    short:Number,
    long:Number,
    time:Number,
    userId:String
})
const Task = mongoose.model('Task',taskSchema)

module.exports = Task