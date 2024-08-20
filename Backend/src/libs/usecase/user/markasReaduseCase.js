export const markasReaduseCase = (dependencies) => {
    const { repositories: { repository :{ markasRead }} } = dependencies

    const execute = async(id , userId) => {
        const result = await markasRead(id , userId)
        if(!result){
            throw new Error("error in markasReaduseCase")
        }

        return result
    } 
    return { execute }
}