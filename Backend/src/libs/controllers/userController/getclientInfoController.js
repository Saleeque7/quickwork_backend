export default (dependencies) => {
    const {use_case : {getclientInfoUsecase}} = dependencies
    const getclientInfoController = async(req,res) => {
        const {execute} = await getclientInfoUsecase (dependencies)
        try {
            const result  = await execute(req.query)
            if(!result){
                return res.status(401).json({message:"error in get client info"})
            }
            return res.status(200).json(result)
        } catch (error) {
            console.error(error ,"error in getclientInfoController");
            return res.status(500).json(error)
        }
    }
    return getclientInfoController 
}