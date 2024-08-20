export const addMessageFileUseCase = (dependencies) => {
    const { repositories: { chatRepository: { addMessageFile } } } = dependencies

    const execute = async(data , file )=>{
        try {
            const result = await addMessageFile(data,file)
            return result
        } catch (error) {
            console.error(error,"error in useCase");
        }
    }
    return { execute }
}