export default (dependencies) => {
    const { use_case : { savedjobUseCase }} = dependencies
    const savedjobController = async(req,res) =>{
        try {
            const { execute } = await savedjobUseCase(dependencies)
            const userId = req.userId
            const page  = parseInt(req.query.page)
            const limit  = parseInt(req.query.limit)
            const result = await execute(userId,page,limit)
            if(!result){
                return res.status(401).json({message : " error in fetching saved job"})
            }
            return  res.status(200).json({jobs:result.result,totalPages:result.totalPages})
           
        } catch (error) {
            console.error(error ,"error in savedjobController");
            return res.status(500).json(error)
        }
    }
    return savedjobController
}