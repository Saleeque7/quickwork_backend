

export const createChatuseCase = (dependencies) => {
    const { repositories: { chatRepository: { createChat } } } = dependencies
    const execute = async (userId , clientId) => {
        const result = await createChat(userId , clientId)
        return result
    }
    return { execute }
}