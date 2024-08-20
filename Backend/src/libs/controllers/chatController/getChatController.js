export default (dependencies) => {
    const { use_case : { getChatUsecase }} = dependencies
    const getChatController = async(req,res) => {
        const person = req.userId || req.clientId
        const { execute } = await getChatUsecase(dependencies)
        try {
            const result = await execute(person)
            if(!result){
                return res.status(401).json({message:"error in get chats"})
            }
            console.log(result);
            return res.status(200).json(result)
        } catch (error) {
            console.error(error,"error in getChatController");
            return res.status(500).json(error)
        }
    }
    return getChatController
}