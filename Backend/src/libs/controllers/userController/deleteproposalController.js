export default (dependencies) => {
    const {use_case : { deleteproposalUsecase }} = dependencies
    const deleteproposalController = async(req,res)=>{
        try {
            const proposalId = req.query.id
            const userId  = req.userId
            const {execute} = await deleteproposalUsecase(dependencies)
            const result  = await execute(proposalId,userId)
            if(!result){
                return res.status(401).json({message : "error in deleteproposalController"})
            }
            return res.status(200).json(result)
        } catch (error) {
            console.error(error,"error in deleteproposalController");  
            return res.status(500).json(error)

        }
    }
    return deleteproposalController
}