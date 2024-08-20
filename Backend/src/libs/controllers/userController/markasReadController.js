export default (dependencies) => {
    const {use_case : { markasReaduseCase }} = dependencies
    const markasReadController = async(req,res) => {
        try {
            const id = req.query.id;
            const userId = req.userId
            const { execute } = await markasReaduseCase(dependencies)
            const result = await execute(id , userId)
            if(!result){
                return res.status(401).json({message:"error in markasReaduseCase"})
            }

            return res.status(200).json(result)
            
        } catch (error) {
            console.error(error,"error in markasReadController");
           return res.status(500).json(error)
        }
    }
    return markasReadController
}