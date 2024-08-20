export const unarchiveJobProposalsUsecase =  (dependencies) => {
    const { repositories: {clientRepository: { unarchiveList } } } = dependencies
    const execute = async(proposalId)=>{
        try {
            const res  = await unarchiveList( proposalId )
            return res
        } catch (error) {
            console.error(error,"error in usecase");
        }
    }
    return {execute}
}