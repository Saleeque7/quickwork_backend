export default (dependencies) => {
    const {use_case : { findchatUsecase }} = dependencies
    const findchatController = async(req,res) => {
        console.log(req.params);
        try {
            const result = await execute(req.params)
            if(!result){
                return res.status(401).json({message:"error in get chats"})
            }
            return res.status(200).json({message:"success"})
        } catch (error) {
            console.error(error,"error in findchatController");
            return res.status(500).json(error)
        }
    }
    return findchatController
}