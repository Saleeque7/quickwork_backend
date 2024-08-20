export default (dependencies) => {
    const {use_case :{applynowUsecase}} = dependencies
    const applynowController = async(req,res) => {
        try {
            const data = req.body
            const user = req.userId     
            const {execute} = await applynowUsecase(dependencies) 
            const result  = await execute(data ,user)

            if(!result ){
                return res.status(401).json({success:false , message:"error in save proposal"})
            }
           
            return res.status(200).json({success:true ,message:"success",user:result})
        } catch (error) {
            console.error(error,"errror in applynowController");
        }
    }
    return applynowController 
}