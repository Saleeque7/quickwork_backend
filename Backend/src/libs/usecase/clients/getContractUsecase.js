export const  getContractUsecase = (dependencies) => {
    const { repositories: {clientRepository: { getContracinfo } } } = dependencies
    const execute = async(id) => {
        const result  =await getContracinfo(id)
        return result
    }
    return { execute }
}