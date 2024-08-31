export default (dependencies) => {
    const wallettransactionController  = async(req,res) => {
        const { use_case : { wallettransactionUsecase }} = dependencies
        try {
            const client = req.clientId
            const {execute} = await wallettransactionUsecase(dependencies)
            const { searchQuery = '' } = req.query;
            const page  = parseInt(req.query.page)
            const limit  = parseInt(req.query.limit)
            const result  = await execute(client ,searchQuery,page,limit)
            if(!result){
                return res.status(403).json({message:"error in feting result"})
            }
            return res.status(200).json({transaction:result.transactions,Pages:result.Pages , balance:result.balance})
        } catch (error) {
            console.error(error,"error in  wallettransactionController");
            return res.status(500).json({message:"error in wallettransactionController"})
        }
    }
    return wallettransactionController 
}