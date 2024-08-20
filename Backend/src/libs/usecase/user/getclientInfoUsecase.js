export const getclientInfoUsecase = (dependencies) => {
    const {repositories : {repository :{ getclientInfo}}} = dependencies
    const execute = async(id) => {
        const result  = await getclientInfo(id)
        if(!result){
            throw new Error("error in getclientInfouseCase")
        }
        return result
    }
    return { execute }
}