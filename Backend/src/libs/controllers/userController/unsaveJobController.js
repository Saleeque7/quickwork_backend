export default (dependencies) => {
    const { use_case: { unsavejobUsecese } } = dependencies
    const unsaveJobController = async (req, res) => {
        try {
            const { execute } = await unsavejobUsecese(dependencies)
            const job = req.body.jobId
            const userId  = req.userId
            const result = await execute(job,userId)
            if (!result) {
                return res.status(401).json({ message: "error in saving job" })
            }
            return res.status(200).json(result)
        } catch (error) {
            console.error(error, "error in unsaveJobController");
            return res.status(500).json(error)
        }
    }
    return unsaveJobController
}