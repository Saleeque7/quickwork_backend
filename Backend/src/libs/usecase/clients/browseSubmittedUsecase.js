export const browseSubmittedUsecase = (dependencies) => {
    const execute = async(id) =>{
    const { repositories: {clientRepository: {browseSubmitted} } } = dependencies

        try {
            const result  = await browseSubmitted(id)
            return result
        } catch (error) {
            console.error(error,"error in useCase");
            
        }
    }
    return { execute }
}