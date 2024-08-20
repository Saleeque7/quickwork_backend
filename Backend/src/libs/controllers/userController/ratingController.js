export default (dependencies) => {
    const ratingController= async(req,res) => {
    const { use_case: { ratingUsecase },} =dependencies
        try {
            const { execute } = await ratingUsecase(dependencies)
            const data  = req.body
            const user = req.userId
            console.log(req.body,"body");
            const result = await execute(data,user)
            if(!result){
                return res.status(404).json({message:"error in rating an a person"})
            }
            return res.status(200).json(result)
            
        } catch (error) {
            console.error(error,"error in ratingController ");
            return res.status(500).json(error)
        }
    }
    return ratingController
}