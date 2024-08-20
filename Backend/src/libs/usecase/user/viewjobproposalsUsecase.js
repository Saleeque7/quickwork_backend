export const viewjobproposalsUsecase = (dependencies) => {
    const { repositories: { repository :{ viewproposal} } } = dependencies

    const execute = async(proposalId)=>{
        const result  = await viewproposal(proposalId) 
        return result
    }
    return { execute }
}