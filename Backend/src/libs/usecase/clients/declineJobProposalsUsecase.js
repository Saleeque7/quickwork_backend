export const declineJobProposalsUsecase =  (dependencies) => {
    const { repositories: {clientRepository: {declineProposal} } } = dependencies
    const execute = async(proposalId)=>{
        try {
            const res  = await declineProposal(proposalId)
            return res
        } catch (error) {
            console.error(error,"error in usecase");
        }
    }
    return {execute}
}