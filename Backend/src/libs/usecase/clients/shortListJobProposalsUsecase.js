export const shortListJobProposalsUsecase =  (dependencies) => {
    const { repositories: {clientRepository: {shortList} } } = dependencies
    const execute = async(proposalId)=>{
        try {
            const res  = await shortList(proposalId)
            return res
        } catch (error) {
            console.error(error,"error in usecase");
        }
    }
    return {execute}
}