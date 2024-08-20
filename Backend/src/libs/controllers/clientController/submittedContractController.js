export default (dependencies ) => {
    const {use_case : { submittedContractUseCase }} = dependencies
    const submittedContractController =  async (req,res) => {
        try {
            const client = req.clientId
            console.log(client,"dwsds");
            
            const { searchQuery = ''} = req.query
            const { execute } = await submittedContractUseCase(dependencies)
            const result = await execute(client,searchQuery)

            if(!result){
                return res.status(401).json({message:"error in controller"})
            }

            return res.status(200).json(result)
        } catch (error) {
            console.error(error,"error in fetching submittedContractController");
            return res.status(500).json(error)
        }
    }
    return submittedContractController
}