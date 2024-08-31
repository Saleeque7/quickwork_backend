export default (dependencies) => {
    const ratingController = async(req,res) => {
        const { use_case: { cllientratingUsecase },} =dependencies
        try {
            const { execute } = await cllientratingUsecase(dependencies)
            const data  = req.body
            const clientId = req.clientId
            console.log(req.body,"body");
            const result = await execute(data,clientId)
            if(!result){
                return res.status(404).json({message:"error in rating an a person"})
            }
            return res.status(200).json(result)
        } catch (error) {
            console.error(error,"error in ratingController");
            return res.status(500).json({message:"error in ratingController"})
            
        }
    }
    return ratingController
}