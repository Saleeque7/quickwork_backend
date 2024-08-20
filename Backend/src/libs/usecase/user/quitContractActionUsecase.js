export const quitContractActionUsecase = (dependencies) =>{
    const execute = async(contractId,reason) => {
    const { repositories: { repository :{ quitContract }} } = dependencies

        try {
            const result  =  await quitContract(contractId,reason)
            return result
        } catch (error) {
            console.error(error);           
        }
    }
    return { execute }
}