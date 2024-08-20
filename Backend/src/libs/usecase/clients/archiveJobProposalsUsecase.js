export const archiveJobProposalsUsecase =  (dependencies) => {
    const { repositories: {clientRepository: { archiveList } } } = dependencies
    const execute = async(proposalId)=>{
        try {
            const res  = await archiveList( proposalId )
            return res
        } catch (error) {
            console.error(error,"error in usecase");
        }
    }
    return {execute}
}