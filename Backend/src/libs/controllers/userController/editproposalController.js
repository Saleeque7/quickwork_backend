export default (dependencies) => {
    const {use_case : {editproposalUsecase }} = dependencies
    const editproposalController = async(req,res) => {
        try {
          
            const proposalId = req.query.id
            const data = req.body
            
            const { execute } = await editproposalUsecase(dependencies)
            const result = await execute(data,proposalId)
            if(!result){
                return res.status(401).json({message:"error in edit proposal"})
            }
            return res.status(200).json(result)
        } catch (error) {
            console.error(error,"error in editproposalController");
            return res.status(500).json(error)
        }
    }
    return editproposalController
}