export const getChatUsecase = (dependencies) => {
    const { repositories: { chatRepository: { getchats } } } = dependencies
    const execute = async(id) => {
        const result = await getchats(id)
        if(!result){
            throw new Error('error in usecase')
        }
        return result
    }
    return { execute }
}