import { useAuthContext } from "./useAuthContext"
export const useFlashMessage = () =>{
    const {setMessage} = useAuthContext()

    const clearMessage = () => {
        setMessage({})
    }

    const setFlashMessage = (data) => {
        setMessage(data)
        if(data.time>0){
            setTimeout(() => {
                clearMessage()
            }, data.time);
        }
        console.log(data.errors)
    }

    return {setFlashMessage,clearMessage}
}