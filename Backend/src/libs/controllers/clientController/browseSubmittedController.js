export  default(dependencies) => {
    const { use_case: { browseSubmittedUsecase } } = dependencies

    const browseSubmittedController  = async(req,res)=>{
        try {
            const {execute}  = await browseSubmittedUsecase(dependencies)
            const { id} = req.query
            
            const result  = await execute(id)
            if(!result){
                return res.status(400).json("error in browseSubmitted Controller" )
            }
            return res.status(200).json(result)
        } catch (error) {
            console.error(error,"error in browseSubmittedController");
            return res.status(500).json(error)
        }
    }
    return browseSubmittedController
}