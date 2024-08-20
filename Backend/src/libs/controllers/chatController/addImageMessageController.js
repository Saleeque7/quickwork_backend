export default (dependencies) => {
    const addMessageFileController = async (req, res) => {
        const { use_case: { addMessageFileUseCase } } = dependencies
        try {
            const data = req.body
            const { key, location } = req.file
            const file = { key, location }

            const { execute } = await addMessageFileUseCase(dependencies)
            const result = await execute(data , file )
            if (!result) {
                return res.status(401).json({ message: "error in adding message" })
            }
            return res.status(200).json(result)
        } catch (error) {
            console.error(error, "error in addMessageFileController");
            return res.status(500).json(error, "error in addMessageFileController")
        }
    }
    return addMessageFileController
}