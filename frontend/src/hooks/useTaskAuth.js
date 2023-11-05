import api from './api'
export const useTaskAuth = () => {
    const createTask = (e) =>{
        console.log(e)
    }
    return {createTask}
}