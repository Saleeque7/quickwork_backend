export default (dependencies) => {
    const {use_case : {edituserInfoUsecase}} = dependencies
    const edituserInfoController  =async(req,res) => {
        try {
            const { execute } = await edituserInfoUsecase(dependencies)
            const userId = req.userId
            const data  = req.body
            const result = await execute(userId,data)
            if(!result){
                return res.status(401).json({message:"error in update userinfo"})
            }

            return res.status(200).json(result)
        } catch (error) {
            console.error(error,"error in edituserInfoController");
            return res.status(500).json(error)
        }
    }
    return edituserInfoController
}