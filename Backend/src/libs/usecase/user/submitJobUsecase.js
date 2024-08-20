export const submitJobUsecase = (dependencies) => {
    const { repositories: { repository :{ saveJobDetails} } } = dependencies

    const execute = async(data) => {
        const result =  await saveJobDetails(data)
        if(!result){
            throw new Error("error in useCase")
        }

        return result
    }
    return {execute}
}