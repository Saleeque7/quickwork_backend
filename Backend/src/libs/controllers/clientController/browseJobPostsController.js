export default (dependencies) => {
    const {use_case : {browseJobPostsUseCase}} = dependencies
    const browseJobPostsController = async(req,res)=>{
        try {
            const clientId = req.clientId
            const { searchQuery = ''} =req.query
            const page  = parseInt(req.query.page)
            const limit  = parseInt(req.query.limit)
            const {execute} = await browseJobPostsUseCase(dependencies)
            const result = await execute(clientId,searchQuery,page,limit)
            if(!result){
                return res.status(500).json({message:"error in browseJobPostsController"})
            }
           return  res.status(200).json({jobpost : result.jobposts , pages:result.totalPage})
        } catch (error) {
            console.error('error in browseJobController :', error)
            
        }
    }
    return browseJobPostsController
}