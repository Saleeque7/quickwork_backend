export const browseContractsUseCase = (dependencies)=>{
    const { repositories: {clientRepository: {browseContractapi} } } = dependencies
    const execute = async(id,searchQuery)=>{
        try {
            const result  = await browseContractapi(id,searchQuery)
            
            return result
        } catch (error) {
            console.error('Error browsing job contracts:', error);
            
        }
    }
    return {execute}
}