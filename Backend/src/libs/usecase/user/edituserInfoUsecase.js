export const edituserInfoUsecase = (dependencies) => {
    const {repositories : {repository :{ edituserInfoById}}} = dependencies

    const execute = async(userId ,data) => {
        const result =  await edituserInfoById(userId,data)
        if(!result){
            throw new Error("error in edituserInfo")
        }
        return result
    }
    return { execute }
} 