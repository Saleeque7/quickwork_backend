export const findchatUsecase  = (dependencies) => {
    const { repositories: { chatRepository: { findchats } } } = dependencies
    const execute = async(data) => {
       const result = await findchats (data)
       return result
    }
    return { execute }
}