export default (dependencies) => {
    const { use_case : { transactionUsecase }} = dependencies
    const transactionController  =async(req,res) => {
        try {
            const {execute} = await transactionUsecase(dependencies)
            const { id } = req.query;
            const client = req.clientId
            const result = await execute(id , client)
            if(!result){
                return res.status(404).json({message:"error in fetching transaction"})
            }
            return res.status(200).json(result)
        } catch (error) {
            console.error(error,"error in transactionController");
            return res.status(500).json({message:"error in fetching transaction details"})
        }
    }
    return transactionController
}