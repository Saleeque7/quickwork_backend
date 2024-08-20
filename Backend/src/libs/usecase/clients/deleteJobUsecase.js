export const deleteJobUsecase = (dependencies) => {
    const { repositories: {clientRepository: { deleteJobpost } } } = dependencies
    const execute = async(JobId)=>{
        try {
            const res =  await deleteJobpost(JobId)
            return res
        } catch (error) {
            console.error(error,"error in useCase");
            
        }
    }
    return { execute }
}