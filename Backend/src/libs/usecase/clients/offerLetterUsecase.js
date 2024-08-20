export const offerLetterUsecase = (dependencies) => {
    const { repositories: { clientRepository: { browseJobapi, getProposalWithUserInfo } } } = dependencies;
    const execute = async (jobId, proposalId) => {
        const JobInfo = await browseJobapi(jobId)
        const proposal = await getProposalWithUserInfo(proposalId)
        if(!JobInfo && !proposal){
            throw new Error("error in offerLetterUsecase")
        }
        return {
            JobInfo,
            proposal
        }
    }
    return { execute }
}