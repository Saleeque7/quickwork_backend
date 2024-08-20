export default (dependencies) => {
    const disLikejobController = async(req,res) => {
        const {use_case : { disLikejobUsecase }} = dependencies
        try {
            const { execute } = await disLikejobUsecase(dependencies)
            const userId = req.userId
            const jobId  = req.body.jobId
            const result  = await execute(jobId , userId)
            if(!result){
                return res.status(401).json({message : "error in dislike the job"})
            }
            return res.status(200).json(result)
            
        } catch (error) {
            console.error(error ,"error in disLikejobController");
            return res.status(500).json(error)
        }
    }
    return disLikejobController
}