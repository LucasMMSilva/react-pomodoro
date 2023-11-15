import { useAuthContext } from "./useAuthContext"
export const useFlashMessage = () =>{
    const {error,setError} = useAuthContext()

    function clearError(){
        setError({error:'',type:'',time:0})
    }

    const setFlashMessage = (data) => {
        setError(data)
        if(data.time>0){
            setTimeout(() => {
                clearError()
            }, data.time);
        }
    }

    return {setFlashMessage}
}