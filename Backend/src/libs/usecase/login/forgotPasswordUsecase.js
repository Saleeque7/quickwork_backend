import { sendVerifyMail } from "../../utils/helpers/sendVerifyMail.js";
export const forgotPasswordUseCase = (dependencies) => {
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

      const user = await findUserByEmail(email)
      const client = await findUserByEmail(email)
      const person = user ? user : client;
      if(!person){
        return { success: false, message: "user does not exist" };
      }
      const message = 'Verification Email for QUICKWORK Password Reset'
      const otp = await sendVerifyMail(person.email, person.name, message)

      console.log(otp,"otp");
      return {
        success:true,
        person: person,
        otp: otp
      }
    } catch (error) {
      console.error('Error in forgotPasswordUseCase:', error.message);
      throw new Error('Error');
    }
  }
  return { executeFunction }
}