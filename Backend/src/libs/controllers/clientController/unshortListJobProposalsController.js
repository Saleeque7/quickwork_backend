export default (dependencies) => {
    const unshortListJobProposalsController  = async(req,res) =>{
        const {use_case : {unshortListJobProposalsUsecase}} =dependencies
        try {
          const proposalId = req.query.id
          const {execute} = await unshortListJobProposalsUsecase(dependencies)
          const result = await execute(proposalId)
          if(!result){
            return res.status(401).json({message:"error in unshortListJobProposalsController"})
          }

          return res.status(200).json({proposals:result})
        } catch (error) {
          return res.status(500).json({message:"error in  unshortListJobProposalsController"})
        }
    }
    return unshortListJobProposalsController
}