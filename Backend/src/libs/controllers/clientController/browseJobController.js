export default (dependencies)=>{
    const browseJobController = async(req,res) => {
        const {use_case : {browseJobUsecase} } = dependencies
        try {
            const id  = req.query.id
            const {execute} = await browseJobUsecase(dependencies)
            const result = await execute(id)
            
            if(!result){
                res.status(401).json({message:"something went wrong in browseJobController "})
            }
            res.status(200).json(result)
        } catch (error) {
            console.error('error in browseJobController :', error)
            
        }
    }
    return browseJobController
}