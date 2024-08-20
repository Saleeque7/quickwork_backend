export const browseDatausecase = (dependencies) => {
    const { repositories: { adminRepository: { browseData } } } = dependencies;

    const execute  = async(id)=>{
        try {
            const result  = await browseData(id)
            return result
        } catch (error) {
            console.error(error,"error in browseDatausecase");       
        }
    }
    return { execute }
}