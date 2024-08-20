export default (dependencies)=>{
    const {use_case : { paymentAfterUsecase }} =dependencies
    const paymentAfterController= async(req,res) => {
        try {
            const { execute }  = await paymentAfterUsecase(dependencies)
            const clientId = req.clientId
            const walletInfo = req.body.data
            const contractId  = req.query.contratid
            const result = await execute(contractId , walletInfo ,clientId)
            console.log(result,"id kittiya");
            

            if(!result){
                return res.status(401).json({message:"error found"})
            }
            return res.status(200).json(result)
    
        } catch (error) {
            console.error(error,"error in paymentAfterUsecase");
           return  res.status(500).json(error)
        }     
    }
    return paymentAfterController
}