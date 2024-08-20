export default (dependencies) => {

    const {use_case : { offerLetterUsecase }} = dependencies

    const offerLetterController = async(req,res)=>{
        const { execute } = await offerLetterUsecase(dependencies)
        try {
      
          const {jobid , proposalId} = req.query
          const result  = await execute(jobid,proposalId)
          if(!result){
            res.status(401).json({message :"error in offerLetterController"})
          }
        
          res.status(200).json({
            jobInfo:result.JobInfo ,
            proposalInfo:result.proposal
          })
        } catch (error) {
            console.error(error ,"error in offerLetterController");
            res.status(500).json({message :error.message})
        }
    }
    return offerLetterController 
}