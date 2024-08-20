export default (dependencies) => {
    const acceptJobSubmitController  = async(req,res) => {
        const {use_case : { acceptJobSubmitUsecase}} = dependencies
        try {

            const {execute} = await acceptJobSubmitUsecase(dependencies)
            const data  = req.body
            const clientId = req.clientId
            const result  = await execute(data,clientId)
            if(!result){
                return res.status(400).json({message:"error in acceptJobSubmitController"})
            }
            return res.status(200).json(result)
        } catch (error) {
            console.error(error,"error in acceptJobSubmitController");
            
            return res.status(500).json(error)
        }
    }
    return acceptJobSubmitController
}

