const Task = require('../models/Task')

const createTask = async(req,res) =>{
    const {title,mainTime,short,long} = req.body
    const userId = req.user.id
    
    if(!title || title.length == 0){
        res.status(422).json({errors:'The title is mandatory.',type:'CREATETASK title',time:0})
        return
    }
    if(!mainTime || mainTime == 0 || !short || short == 0 || !long || long == 0){
        res.status(422).json({errors:'The minimum value is 1 minute.',type:'CREATETASK time',time:0})
        return
    }

    const user = new Task({
        title,
        mainTime,
        short,
        long,
        userId
    })
    const newTask = await user.save()
    res.status(201).json(newTask)
}

const getAllTaskByUser = async (req,res)=>{
    const userId = req.user.id
    const tasks = await Task.find({userId})
    if(!tasks){
        res.status(404).json({errors:['Tasks not found.']})
        return
    }
    res.status(200).json(tasks)
}

const getTaskById = async(req,res)=>{
    const userId = req.user.id
    const {id}= req.params
    const task = await Task.findById(id)
    if(!task){
        res.status(404).json({errors:['Task not found.']})
        return
    }
    if(task.userId != userId){
        res.status(422).json({errors:['Access denied.']})
        return
    }
    
    res.status(200).json(task)
}

const taskUpdateById = async (req,res)=>{
    const {id} = req.params
    const {title,mainTime,short,long,time} = req.body
    const userId = req.user.id

    const task = await Task.findById(id)
    if(!task){
        res.status(422).json({errors:['Task not found.']})
        return
    }
    if(task.userId!=userId){
        res.status(422).json({errors:['Access denied.']})
        return
    }
    if(title){
        task.title = title
    }
    if(mainTime){
        task.mainTime = mainTime
    }
    if(short){
        task.short = short
    }
    if(long){
        task.long = long
    }
    if(time){
        task.time = time
    }
    const newTask = await task.save()

    res.status(201).json(newTask)
}

const deleteTaskById = async(req,res)=>{
    const {id} = req.params
    const userId= req.user.id

    const task = await Task.findById(id)

    if(!task){
        res.status(422).json({errors:['Task not found.']})
        return
    }

    if(task.userId != userId){
        res.status(422).json({errors:['Access denied.']})
        return
    }
    try{
        await Task.deleteOne(task._id)
        res.status(200).json({msg:'Task deleted successfully.',type:'DELETETASK',time:10000})
    }catch(error){
        res.status(422).json({errors:['Task not found.']})
    }
}

module.exports = {createTask,getAllTaskByUser,getTaskById,taskUpdateById,deleteTaskById}