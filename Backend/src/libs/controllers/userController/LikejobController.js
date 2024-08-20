export default (dependencies) => {
    const LikejobController = async(req,res) => {
        const {use_case : { LikejobUsecase }} = dependencies
        try {
            const { execute } = await LikejobUsecase(dependencies)
            const userId = req.userId
            const jobId  = req.body.jobId
            const result  = await  execute(jobId , userId)
            if(!result){
                return res.status(401).json({message : "error in like the job"})
            }
            return res.status(200).json(result)
            
        } catch (error) {
            console.error(error ,"error in LikejobController");
            return res.status(500).json(error)
        }
    }
    return LikejobController
}