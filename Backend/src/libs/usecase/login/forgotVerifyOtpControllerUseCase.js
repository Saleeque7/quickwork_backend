import { verifyOtp } from "../../utils/helpers/otpVerify.js";
export const forgotVerifyOtpUseCase = (dependencies) => {
    const executeFunction = async (otp, enteredotp) => {
  try {
      const isMatch = await verifyOtp(otp, enteredotp);
      return isMatch;
    }
  catch (error) {
    console.error("Error in forgotVerifyOtpUseCase:", error.message);
    throw new Error("Error in verifying otp ");
  }
}
return { executeFunction };
}
