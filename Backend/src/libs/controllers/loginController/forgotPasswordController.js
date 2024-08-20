export default (dependencies)=>{
    const {
        use_case: { forgotPasswordUseCase },
      } = dependencies;
    const forgotPasswordController = async(req,res)=>{
        const {email} = req.body
        const {executeFunction} = forgotPasswordUseCase(dependencies)
        const result  = await executeFunction(email)
        if(!result.success){
            return  res.status(404).json({success:false ,  message: result.message });
        }
      
       return res.status(200).json({success:true , message:"please verify otp",otp : result.otp})
    }
    return forgotPasswordController
}