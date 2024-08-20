export default (dependencies) => {
    const {use_case : { quitContractActionUsecase}} = dependencies
    const quitContractactionController = async(req,res) =>{
        try {
            const { execute } = await  quitContractActionUsecase(dependencies)
            const { id ,reason } = req.body
            const userId = req.userId
            const result  = await execute(id,reason)
            if(!result){
                return res.status(404).json({message:"error in quitContract"})
            }
            return res.status(200).json(result)
        } catch (error) {
            console.error(error,"error in controller");
            return res.status(500).json(error)
        }
    }
    return quitContractactionController
}