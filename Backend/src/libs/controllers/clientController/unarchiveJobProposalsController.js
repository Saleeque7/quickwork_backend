export default (dependencies) => {
    const unarchiveJobProposalsController  = async(req,res) =>{
        const {use_case : {   unarchiveJobProposalsUsecase  }} =dependencies
        try {
          const proposalId = req.query.id
          const {execute} = await unarchiveJobProposalsUsecase(dependencies)
          const result = await execute(proposalId)
          if(!result){
            return res.status(401).json({message:"error in unarchiveJobProposalsController"})
          }

          return res.status(200).json({proposals:result})
        } catch (error) {
          return res.status(500).json({message:"error in unarchiveJobProposalsController"})
        }
    }
    return unarchiveJobProposalsController
}