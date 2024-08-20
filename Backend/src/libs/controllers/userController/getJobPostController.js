export default (dependencies) => {
const {use_case : {getJobPostUsecase}} = dependencies
    const getJobPostController = async(req,res) => {
        const {execute} = await getJobPostUsecase(dependencies)
        try {
            const heading  = req.query.activeHeading
            const page  = parseInt(req.query.page)
            const limit  = parseInt(req.query.limit)
            const userId = req.userId

            const Jobs  = await execute(heading,userId,page,limit)
            if(!Jobs){
                res.status(401).json({message:"no jobdetails found"})

            }
        console.log(Jobs,"jobs");

            res.status(200).json({jobs:Jobs.result,totalPages:Jobs.totalPages})
        } catch (error) {
            res.status(500).json("error in getJobPostController")
        }
    }
    return getJobPostController
}