export default (dependencies) => {
    const {use_case : {browseJobpostUsecase}} = dependencies
    const browseJobpostController =async(req,res)=>{
        try {
            const id =req.query.id
            const userId  = req.userId 
            const {execute} = await browseJobpostUsecase(dependencies)
            const result  = await execute(id,userId)
            if(!result){
                return res.status(401).json({message:"error in browseJobpostController"})
            }
            return res.status(200).json(result)
        } catch (error) {
            console.error(error,"browseJobpostController")
        }
    }
    return browseJobpostController
}