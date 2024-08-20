export default (dependencies) => {
    const {use_case : {browseUsersUsecase} } = dependencies
    const browseUsersController = async (req, res) => {
        const { execute } = await browseUsersUsecase (dependencies)
        try {
            const { searchQuery = '' } = req.query; 
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit)
            
            const result  = await execute(searchQuery,page,limit)
            if(!result){
               return  res.status(401).json({message : "error in fetch userData"})
            }

            return res.status(200).json({users:result.users , page:result.totalpage})
        } catch (error) {
            console.error('error in browseUsersController :', error)
        }
    }
    return browseUsersController
}