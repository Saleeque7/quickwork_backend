export default (dependencies) => {
    const { use_case: { browseJobProposalsUsecase } } = dependencies
    const browseJobProposalsController = async (req, res) => {
        const jobId = req.query.id
        const { execute } = await browseJobProposalsUsecase(dependencies)
        try {
            const result = await execute(jobId)
            if (!result) {
                return res.status(401).json({ message: "error in fetchin proposals" }) 
            }

            return res.status(200).json({ proposals: result })
        } catch (error) {
            console.error(error, " error in browseJobProposals controller");
            return res.status(500).json({ message: "browseJobProposals controller" })

        }
    }
    return browseJobProposalsController
}