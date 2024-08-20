export default (dependencies) => {
    const { use_case: { getmessageUsecase } } = dependencies
    const getmessageController = async (req, res) => {
        try {
            const chatId = req.query.id
            const { execute } = getmessageUsecase(dependencies)
            const result = await execute(chatId)
            if (!result) {
                return res.status(401).json({ message: "erro in getmessageController" })
            }
            return res.status(200).json(result)
        } catch (error) {
            console.error(error, "error in getmessageController");
            return res.status(500).json(error, "error in getmessageController")
        }
    }
    return getmessageController
}