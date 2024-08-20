export const getuserInfoUsecase = (dependencies) => {
    const {repositories : {clientRepository :{ getuserInfo}}} = dependencies
    const execute = async(id) => {
        const result  = await getuserInfo(id)
        if(!result){
            throw new Error("error in getuserInfoUsecase")
        }
        return result
    }
    return { execute }
}