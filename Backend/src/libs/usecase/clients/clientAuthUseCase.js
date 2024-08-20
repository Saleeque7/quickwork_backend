import {sendVerifyMail} from "../../utils/helpers/sendVerifyMail.js"

export const clientAuthUsecase = (dependencies) => {
    const { repositories: { clientRepository } } = dependencies
    if (!clientRepository) throw new Error("error in client repository")
    const executeFunction = async (email, name) => {
        try {
            let otp = await sendVerifyMail(email, name)
            return otp
        } catch (error) {
            throw new Error(error.message)
        }
    }
    return { executeFunction }
}