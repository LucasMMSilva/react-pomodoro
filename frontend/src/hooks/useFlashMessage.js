import { useAuthContext } from "./useAuthContext"
export const useFlashMessage = () =>{
    const {message,setMessage} = useAuthContext()

    function clearError(){
        setMessage({})
    }

    const setFlashMessage = (data) => {
        setMessage(data)
        if(data.time>0){
            setTimeout(() => {
                clearError()
            }, data.time);
        }
        console.log(data.errors)
    }

    return {setFlashMessage}
}