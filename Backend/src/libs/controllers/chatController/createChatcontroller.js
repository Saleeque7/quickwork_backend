export default (dependencies) => {
    const { use_case: { createChatuseCase } } = dependencies
    const createChatcontroller = async (req, res) => {
        const userId  = req.body.userId
        const clientId = req.clientId
        try {
            const { execute } = await createChatuseCase(dependencies)
            const result = await execute(userId,clientId)
            if(!result){
                return res.status(401).json({message:"error in creation"})
            }
            return res.status(200).json({message:"success"})
        } catch (error) {
            console.error(error,"error in createChatcontroller");
            return res.status(500).json(error)
        }
    }
    return createChatcontroller
}