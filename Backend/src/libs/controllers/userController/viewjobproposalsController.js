export default (dependencies) => {
    const {use_case : { viewjobproposalsUsecase}} = dependencies 
    const viewjobproposalsController = async(req,res) => {
        try {
            const proposalId = req.query.id
            const {execute} = await viewjobproposalsUsecase(dependencies)
            const result = await execute(proposalId)
            if(!result){
                return res.status(401).json({message:"erro in viewjobproposalsController"})
            }
            return res.status(200).json(result)
        } catch (error) {
            console.error(error,"error in viewjobproposalsController");
            return res.status(500).json(error)
        }
    }
    return viewjobproposalsController
}