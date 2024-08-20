export default (dependencies) => {
    const {use_case : { getContractUsecase }} = dependencies
    const getContractController  = async(req,res) => {
        try {
            const {execute } = getContractUsecase(dependencies)
            const contractId  = req.query.id
            const result = await execute(contractId)
            if(!result){
                return res.status(401).json({message:"error in fetching contract details"})
            }

            return res.status(200).json(result)
        } catch (error) {
            console.error(error,"error in getContractController");
           return  res.status(500).json(error)
        }
    }
    return getContractController 
}