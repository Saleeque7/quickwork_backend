export const getmessageUsecase = (dependencies)=> {
    const { repositories: { chatRepository: { getmessages } } } = dependencies
    const execute = async(chatId) => {
        const result = await getmessages(chatId)
        
        return result
    }
    return { execute }
}