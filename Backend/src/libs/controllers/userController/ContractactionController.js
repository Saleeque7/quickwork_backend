export default (dependencies) => {
    const ContractactionController = async(req,res)=>{
       const {use_case : { ContractactionuseCase }} = dependencies
        const { id, action } = req.body;
        try {
            const {execute} = await ContractactionuseCase(dependencies)
            const result = await execute(id,action)
            if(!result){
                return res.status(401).json({message:"error in ContractactionController"})
            }
            return res.status(200).json(result)
            
        } catch (error) {
            console.error(error , "error in ContractactionController");
            return res.status(500).json(error)
        }
    }
    return ContractactionController
}