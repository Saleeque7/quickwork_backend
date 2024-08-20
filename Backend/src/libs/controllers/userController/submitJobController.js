export default (dependencies) => {

    const {use_case : {submitJobUsecase} } = dependencies

    const submitJobController = async(req,res) => {
        try {
            const userId = req.userId
            const {clientId,contractId,jobId,completionDate,overview} = req.body
            const {location , key} = req.file
            const projectFile =  {location , key}
            const {execute} = await submitJobUsecase(dependencies)
            const userData = {clientId,contractId,jobId,completionDate,overview ,projectFile,userId}

            const result  =await execute(userData)


            if(!result){
                return res.status(401).json({message:"error in submitJobController"})
            }

            return res.status(200).json(result)
            
        } catch (error) {
            console.error(error,"error in submitJobController");
            return res.status(500).json(error)
        }
    }
    return submitJobController
}