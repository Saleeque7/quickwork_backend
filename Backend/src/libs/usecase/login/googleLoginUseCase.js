
import { maskEmail } from "../../utils/helpers/maskEmail.js";
export const googleLoginUseCase = (dependencies) => {
    const {
        repositories: {
            loginRepository: { findUserByEmail, findClientByEmail },
        },
    } = dependencies;
    const executeFunction = async (email) => {
        try {
            const user = await findUserByEmail(email)
            const client = await findClientByEmail(email)
            const person = client || user
            const maskedEmail =  maskEmail(email)
            if (person) {
                if (person.isGoogle && person.isVerified) {
                    return { success: true, message: "success", user: person };
                } else {
                    return { success: false, message: `An account with the email ${email} already in use with another provider` }
                }
            } else {
                return { success: false, message: `Google account ${maskedEmail} is not recognized for Google Sign-In on Quickwork. Please make sure you are using the same account that you have previously linked.` };
            }
        } catch (error) {
            console.error('Error in googleLoginUseCase:', error.message);
            throw new Error('user does not exist ');
        }
    }
    return { executeFunction }
}