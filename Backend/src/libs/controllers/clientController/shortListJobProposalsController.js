export default (dependencies) => {
    const shortListJobProposalsController  = async(req,res) =>{
        const {use_case : {shortListJobProposalsUsecase}} =dependencies
        try {
          const proposalId = req.query.id
          const {execute} = await shortListJobProposalsUsecase(dependencies)
          const result = await execute(proposalId)
          if(!result){
            return res.status(401).json({message:"error in shortListJobPropossal"})
          }

          return res.status(200).json({proposals:result})
        } catch (error) {
          return res.status(500).json({message:"error in     return shortListJobProposalsController"})
        }
    }
    return shortListJobProposalsController
}