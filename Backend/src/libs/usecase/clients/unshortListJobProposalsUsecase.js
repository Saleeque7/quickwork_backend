export const unshortListJobProposalsUsecase =  (dependencies) => {
    const { repositories: {clientRepository: {unshortList} } } = dependencies
    const execute = async(proposalId)=>{
        try {
            const res  = await unshortList(proposalId)
            return res
        } catch (error) {
            console.error(error,"error in usecase");
        }
    }
    return {execute}
}