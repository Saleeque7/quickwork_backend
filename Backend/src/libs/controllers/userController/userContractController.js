export default (dependencies) => {
    const {use_case : { userContractUsecase }} = dependencies
    const userContractController  = async(req,res) => {
        try {
            const {execute } = userContractUsecase(dependencies)
            const contractId  = req.query.id
            const result = await execute(contractId)
            if(!result){
                return res.status(401).json({message:"error in fetching contract details"})
            }

            return res.status(200).json(result)
        } catch (error) {
            console.error(error,"error in userContractController");
           return  res.status(500).json(error)
        }
    }
    return userContractController 
}