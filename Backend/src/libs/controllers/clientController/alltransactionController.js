export default (dependencies) => {
    const alltransactionController  =async (req,res) =>{
        const { use_case : { alltransactionUsecase }} = dependencies
        try {
            const { execute } = await alltransactionUsecase(dependencies)
            const client = req.clientId
            const { searchQuery = '' } = req.query;
            const page  = parseInt(req.query.page)
            const limit  = parseInt(req.query.limit)
            const result = await execute(client ,searchQuery,page,limit)
            if(!result){
                return res.status(404).json({message:"error in transactionController"})
            }
            return res.status(200).json({transaction:result.transactions,Pages:result.Pages})
        } catch (error) {
            console.error(error,"error in alltransactionController");
            return res.status(500).json(error)
        }
    }
    return alltransactionController
}