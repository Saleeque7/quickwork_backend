export default (dependencies) => {
    const archiveJobProposalsController  = async(req,res) =>{
        const {use_case : {archiveJobProposalsUsecase}} =dependencies
        try {
          const proposalId = req.query.id
          const {execute} = await archiveJobProposalsUsecase(dependencies)
          const result = await execute(proposalId)
          if(!result){
            return res.status(401).json({message:"error in archiveJobProposalsController"})
          }

          return res.status(200).json({proposals:result})
        } catch (error) {
          return res.status(500).json({message:"error in    archiveJobProposalsController"})
        }
    }
    return archiveJobProposalsController
}