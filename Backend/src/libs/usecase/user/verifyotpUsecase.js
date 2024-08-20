import { verifyOtp } from "../../utils/helpers/otpVerify.js"
import { hashuserPassword } from "../../utils/helpers/hashPassword.js"

export const verifyotpUsecase = (dependencies) => {
    const { repositories: { repository } } = dependencies
    if (!repository) throw new Error('repo error')
    const executeFunction = async (otp, enteredotp, userData) => {
        const { name, email, phone, password, job_role } = userData
        try {
            const isVerified = await verifyOtp(otp, enteredotp)                   
            const hashPassword = await hashuserPassword(password)
            if (!hashPassword) throw new Error("hash password error")
            const userInfo = {
                name: name,
                email: email,
                phone: phone,
                password: hashPassword,
                job_role: job_role
            }
            return {
                isVerified: isVerified,
                userInfo: userInfo
            }
        } catch (error) {
            console.error('Error in verifyotpUsecase:', error.message);
            throw new Error('Error processing OTP verification');
        }
    }
    return { executeFunction }
} 