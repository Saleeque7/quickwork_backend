export const createContractuseCase = (dependencies) => {
    const { repositories: { clientRepository :{createContract} } } = dependencies
    const execute = async(data) => {
        const result  = await createContract(data)
        if(!result){
            throw new Error("error in createContractuseCase")
        }

        return result
    }
    return {execute}
}