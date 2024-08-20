export default (dependencies) => {
    const {use_case : {browseContractsUseCase}} = dependencies
    const browseContractsController = async(req,res)=>{
        try {
            const clientId = req.clientId
            const { searchQuery = '' }  = req.query
            const {execute} = await browseContractsUseCase(dependencies)
         
            const result = await execute(clientId,searchQuery)
           
           return  res.status(200).json(result)
        } catch (error) {
            console.error('error in browseContractsController :', error)
            
        }
    }
    return browseContractsController
}