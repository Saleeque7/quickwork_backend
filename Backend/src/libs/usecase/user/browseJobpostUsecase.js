export const browseJobpostUsecase= (dependencies)=> {
    const {repositories : {repository : { browseJobpost }}} = dependencies
    const execute = async(id,userId) => {
        try {
        const result  = await browseJobpost(id,userId)
            return result
        } catch (error) {
            console.error(error,"error in browseJobpostUsecase")
        }
    }
    return { execute }
}