export const getUserDataUseCase =(dependencies)=>{
    const { repositories: { adminRepository: { findUsers } } } = dependencies

    const executeFunction = async() => {
        try {
            const result = await findUsers()
            return result
        } catch (error) {
           console.error("error in getUserDataUseCase"); 
        }

    }
    return {executeFunction}
}