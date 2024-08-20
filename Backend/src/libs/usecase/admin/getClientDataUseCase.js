

export const getClientDataUseCase = (dependencies)=> {
    const { repositories: { adminRepository: { findClients } } } = dependencies

    const executeFunction = async() =>{
        try {
            const result = await findClients()
            return result
        } catch (error) {
           console.error("error in getUserDataUseCase"); 
        }
    }
    return {executeFunction}
}