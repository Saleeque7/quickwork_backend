export default (dependencies) =>{
    const { use_case: { resendOtpUsecase },} =dependencies
    const resendOtpController = async(req,res)=>{
        const {name,email,phone,password, job_role} = req.body
        try {
            const {executeFunction} = await resendOtpUsecase(dependencies)
            const resendOtp = await executeFunction(email ,name)
            console.log("resend otp:",resendOtp);
          
            if(!resendOtp)return res.status(401).json({ error: "Resending OTP failed",message:"please resend otp"})
                return res
                    .status(200)
                    .json({ success: true, message: " Please verify otp !!", resendOtp: resendOtp });
        } catch (error) {
            console.error("Error:", error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({ message: error.message || "Internal server error" });
        }
    }
    return resendOtpController
}