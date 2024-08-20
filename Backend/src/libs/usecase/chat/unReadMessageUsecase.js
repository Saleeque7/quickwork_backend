export const unReadMessageUsecase = (dependencies) => {
    const { repositories: { chatRepository: { unReadMessages } } } = dependencies

    const execute = async(data) => {
        const result  = await unReadMessages(data)
        return result
    }
    return { execute }
}