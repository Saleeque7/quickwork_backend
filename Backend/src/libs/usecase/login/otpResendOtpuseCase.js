import { sendVerifyMail } from "../../utils/helpers/sendVerifyMail.js";

export const otpResendOtpuseCase  = (dependencies)=>{
    const {
        repositories: {
          loginRepository: { findUserByEmail, findClientByEmail },
        },
      } = dependencies;
      if (!findUserByEmail || !findClientByEmail) {
        throw new Error("loginRepository error");
      }
    const executeFunction = async (email) => {
        try {
            const user = await findUserByEmail(email);
            const client = await findClientByEmail(email);
            const person = user ? user: client
            const message = 'Verification Email for QUICKWORK Password Reset'
            const resendOtp = await sendVerifyMail(person.email, person.name, message)
            console.log(resendOtp,"resendOtp");
            return {
                resendOtp: resendOtp
              }
        } catch (error) {
            console.error("Error in otpResendOtpuseCase:", error.message);
            throw new Error("Error ");
        }
    }
    return {executeFunction}
}