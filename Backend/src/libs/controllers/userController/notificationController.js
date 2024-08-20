export default (dependencies) => {
    const {use_case: { notificationUsecase }} = dependencies
    const notificationController = async (req,res) => {
        try {
            const id  = req.userId
            const {execute} = await notificationUsecase(dependencies)
            const result = await execute(id)
            if(!result){
                return res.status(401).json({message:"error in fetching notification in notificationController"})
            }
            return res.status(200).json(result)
        } catch (error) {
            console.error(error, "error in notificationController");
            return res.status(500).json(error)
        }
    }
    return notificationController
}