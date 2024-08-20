export const messageUsecase = (dependencies) => {
    const { repositories: { chatRepository: { createMessage } } } = dependencies

    const execute = async (data) => {
       const result =  await createMessage(data)
       if(!result){
        throw new Error("error in useCase")
       }
       return result
    }
    return { execute }
}