export const verifyOtp = async(otp , enterOtp)=>{
    try {
       if(!otp || ! enterOtp){
        throw new Error("please enter a otp")
       }
       if(otp === enterOtp){
        return true
       }else{
        return false
       }
    
   } catch (error) {
    throw new Error(`Error verifying OTP: ${error.message}`)
   }
} 