export default (dependencies) => {
    const {use_case : { acceptedContractuseCase }} = dependencies
    const acceptedContractController  = async (req,res) => {
        try {
            const user = req.userId
            const { searchQuery = '' } = req.query; 
            const page  = parseInt(req.query.page)
            const limit  = parseInt(req.query.limit)
            const { execute } = await acceptedContractuseCase(dependencies)
            const result  =await execute(user,searchQuery,page,limit)
            if(!result){
                return res.status(401).json({message:"error in acceptedContractController"})
            }
            return res.status(200).json({contracts:result.contracts,pages:result.totalPages})
        } catch (error) {
            console.error(error,"error in acceptedContractController");
            return res.status(500).json(error)
        }
    }
    return acceptedContractController
}