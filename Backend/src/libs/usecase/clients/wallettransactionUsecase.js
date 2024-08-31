export const wallettransactionUsecase =(dependencies)=>{
    const { repositories: {clientRepository: { wallettransactions } } } = dependencies

    const execute = async(client,searchQuery,page,limit)=>{
        try {
            const skip = (page - 1) * limit;
           const {transactions ,totalCount , balance}  = await wallettransactions(client,searchQuery,skip,limit) 
           const Pages = Math.ceil(totalCount / limit)
           return {
            transactions,
            Pages,
            balance
           }
        } catch (error) {
            throw error
        }
    }
    return { execute }
}