export default (dependencies) =>{
    const {use_case : { otpResendOtpuseCase }} = dependencies
    const otpResendOtpController = async(req,res)=>{
        const {email } = req.body
        try {
            const {executeFunction } = await otpResendOtpuseCase (dependencies)
            const {  resendOtp } = await executeFunction(email)

            if(!resendOtp)return res.status(401).json({ error: "Resending OTP failed",message:"please resend otp"})
                return res
                    .status(200)
                    .json({ success: true, message: " Please verify otp !!", resendOtp: resendOtp });
        } catch (error) {
            console.error("Error:", error);
            const statusCode = error.status || 500;
            return res
              .status(statusCode)
              .json({ message: error.message || "Internal server error" });
          
        }
    }
    return otpResendOtpController
} 