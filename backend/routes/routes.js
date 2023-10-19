const express = require('express')
const router = express.Router()
const authGuard = require('../middlewares/authGuard')

const {register,login} = require('../controllers/UserController')
const {createTask,getAllTaskByUser,getTaskById, taskUpdateById, deleteTaskById} = require('../controllers/TaskController')

//Users
router.post('/user/register',register)
router.post('/user/login',login)

//Tasks
router.get('/task/tasks',authGuard,getAllTaskByUser)
router.get('/task/:id',authGuard,getTaskById)

router.post('/task/createtask',authGuard,createTask)

router.put('/task/:id',authGuard,taskUpdateById)

router.delete('/task/:id',authGuard,deleteTaskById)
module.exports = router