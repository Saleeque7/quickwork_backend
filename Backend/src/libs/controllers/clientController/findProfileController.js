
export default (dependencies)=>{
    const { use_case :{findProfileUsecase }} = dependencies
    const findProfileController = async(req,res) => {
       try {
        const user = req.query.id
        const { execute } = await findProfileUsecase(dependencies)
        const result = await execute(user)
        if(!user){
            return res.status(401).json({message:"error in findProfileController"})
        }
        return res.status(200).json(result)
        } catch (error) {
        console.error(error,"error in fetching user info");
        
        return res.status(500).json(error)
       } 
    }
    return findProfileController
}