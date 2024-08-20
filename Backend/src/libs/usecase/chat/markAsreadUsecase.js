export const markAsreadUsecase = (dependencies) => {
    const { repositories: { chatRepository: { markasread } } } = dependencies

    const execute = async(data) => {
        const result  = await markasread(data)
        return result
    }
    return { execute }
}