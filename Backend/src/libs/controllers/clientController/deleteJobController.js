export default (dependencies) => {
    const {use_case : { deleteJobUsecase}} = dependencies
    const deleteJobController = async (req, res) => {
        try {
            console.log(req.query,"uguyhguyh");
            
            const JobId = req.query.jobId  
                 
           const  {execute} = await deleteJobUsecase(dependencies)
            const result = await execute(JobId)
            if(!result){
                return res.status(401).json({message:"error in delete job data"})
            }
            return res.status(200).json(result)
        } catch (error) {
            console.error(error, "error in deleteJobController");
            return res.status(500).json(error)
        }
    }
    return deleteJobController
}