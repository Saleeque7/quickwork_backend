export const acceptedContractuseCase= (dependencies) => {
    const {repositories : {repository : { acceptedContracts }}} = dependencies
    const execute = async(id,searchQuery,page,limit) => {
        const skip = (page - 1) * limit;
        const { contracts, count}  = await acceptedContracts(id,searchQuery,skip,limit)
    
        const totalPages = Math.ceil(count / limit)
        
        return {
            contracts, 
            totalPages 
        }
    }
    return { execute }
}