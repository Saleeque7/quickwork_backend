export default (dependencies) => {
    const { use_case: { browseDatausecase } } = dependencies;

    const browseDataController  =async(req,res) =>{
        try {
            const {execute } = await browseDatausecase(dependencies)
            const adminId  = req.adminId
            const result  = await execute(adminId)
            if(!result){
                return res.status(404).json({message:"error in browseDataController"})
            }
            return res.status(200).json(result)
        } catch (error) {
            console.error(error,"error in fetchinf data");
            return res.status(500).json(error)
        }
    }
    return browseDataController
}