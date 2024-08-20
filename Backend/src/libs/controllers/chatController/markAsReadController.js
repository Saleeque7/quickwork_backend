export default (dependencies ) => {
    const { use_case : { markAsreadUsecase}} = dependencies
    const markAsReadController  =async (req,res) => {
        try {
          
            const {execute} = await  markAsreadUsecase(dependencies)

            const data  = req.body

            console.log(req.body     ,"mark as read");
            
            const result  = await execute(data)

            if(!result){
                return res.status(401).json({message:"error in fetching data"})
            }

            return res.status(200).json(result)
            
        } catch (error) {
            console.error("error in markAsReadController:",error);
            return res.status(500).json(error)
            
        }
    }
    return markAsReadController
}