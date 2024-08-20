export const acceptJobSubmitUsecase = (dependencies) =>{
    const { repositories: {clientRepository: { acceptJobSubmit } } } = dependencies

    const execute = async(data,clientId) =>{
        try {
            const result = await acceptJobSubmit(data,clientId)
            return result
        } catch (error) {
            console.error(error,"error in acceptJobSubmitUsecase");
            
        }
    }
    return { execute }
}