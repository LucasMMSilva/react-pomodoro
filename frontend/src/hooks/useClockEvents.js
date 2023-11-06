import api from './api'
export const useClockEvents = () => {  

    const token = localStorage.getItem('token')

    const deleteTaskById = async(id) =>{
        await api.delete(`/task/${id}`,{
            headers:{
              authorization:`Bearer ${JSON.parse(token)}`
            }}
        ).then().catch((err)=>{
            console.log(err.response.data.errors)
        })
    }
    const editTaskById = async(id) =>{
        console.log('editar')
    }


    return {deleteTaskById,editTaskById}
}