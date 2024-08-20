export default (dependencies) => {
    const findWorkController =async(req,res)=> {
        const {use_case : {findWorkUsecase}} = dependencies
        try {
            const { search = '' } = req.query;
            const page  = parseInt(req.query.page)
            const limit  = parseInt(req.query.limit)
            const { execute} = await findWorkUsecase(dependencies)
            const result  = await execute(search,page,limit)
            if(!result){
                return res.status(401).json({message:"error in useCase"})
            }
            return res.status(200).json({jobs:result.jobPosts,pages:result.totalPages})
        } catch (error) {
            console.error(error,"error in findWorkController");
            return res.status(500).json(error)
        }
    }
    return findWorkController
}