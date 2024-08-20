export default (dependencies) => {
    const messageController = async (req, res) => {
        const { use_case: { messageUsecase } } = dependencies
        try {
            const data = req.body
            const { execute } = await messageUsecase(dependencies)
            const result = await execute(data)
            if (!result) {
                return res.status(401).json({ message: "error in adding message" })
            }
            return res.status(200).json(result)
        } catch (error) {
            console.error(error, "error in messagecontroller");
            return res.status(500).json(error, "error in messagecontroller")
        }
    }
    return messageController
}