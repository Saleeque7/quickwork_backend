export default (dependencies ) => {
    const { use_case : { unReadMessageUsecase}} = dependencies
    const unReadmessagesController  =async (req,res) => {
        try {
          
            const {execute} = await  unReadMessageUsecase(dependencies)

            const data  = req.query
            const result  = await execute(data)  

            return res.status(200).json(result)
            
        } catch (error) {
            console.error("error in unReadmessagesController:",error);
            return res.status(500).json(error)
            
        }
    }
    return unReadmessagesController
}