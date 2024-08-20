export const alltransactionUsecase = (dependencies)=>{
    const { repositories: {clientRepository: { alltransactions } } } = dependencies

    const execute = async(client,searchQuery,page,limit)=> {
        try {
            const skip = (page - 1) * limit;
           const {transactions ,totalCount }  = await alltransactions(client,searchQuery,skip,limit) 
           const Pages = Math.ceil(totalCount / limit)
           return {
            transactions,
            Pages
           }
        } catch (error) {
            throw error
        }
    }
    return { execute}
}