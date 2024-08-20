export const editproposalUsecase = (dependencies) => {
    const {repositories : {repository :{ editProposal}}} = dependencies

    const execute = async(data,proposalid) => {
        const result  = await editProposal(data ,proposalid)
        return result
    }
    return {execute}
}