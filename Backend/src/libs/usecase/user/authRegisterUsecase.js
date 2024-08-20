import { sendVerifyMail } from "../../utils/helpers/sendVerifyMail.js"


export const authRegisterUsecase = (dependencies)=>{
    const {repositories:{repository}} = dependencies
    if(!repository)throw new Error('repo error')
     const executeFunction = async(email,name) =>{
    try {
        const message = 'Verification Email for QUICKWORK Registration'

        let otp  = await sendVerifyMail(email ,name , message)
        return otp
    } catch (error) {
        throw new Error(error.message)
    }
    }
    return {executeFunction}
}