export const browseJobProposalsUsecase  = (dependencies) => {
    const { repositories: {clientRepository: {browseProposals} } } = dependencies

    const execute = async(jobId) => {
        try {
            const res = await browseProposals(jobId)
            return res
        } catch (error) {
        console.error(error,"error in browseJobProposalsUsecase");
        }
    }
    return {execute}
}