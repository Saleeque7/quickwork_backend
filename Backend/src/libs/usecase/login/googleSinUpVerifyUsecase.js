
import { maskEmail } from "../../utils/helpers/maskEmail.js";

export const googleSinUpVerifyUsecase = (dependencies) => {
  const {
    repositories: {
      loginRepository: { findUserByEmail, findClientByEmail, createUser },
    },
  } = dependencies;
  const executeFunction = async (userType, data) => {
    try {
      const { email } = data

      const user = await findUserByEmail(email)
      const client = await findClientByEmail(email)
      const person = user || client
      const maskedEmail = maskEmail(email)
      if (person) {
        if (person.isGoogle && person.isVerified) {
          return { success: true, message: "success", user: person };
        } else if (person && !person.isGithub && !person.isGoogle) {
          return {
            success: false,
            message: `That Google account ${maskedEmail} isn't currently associated with an QuickWork account. Log in using your QuickWork login first, then link your Google account for future use`

          }
        }
        else {
          return { success: false, message: `An account with the email ${email} already in use with another provider` }
        }
      }

      const newuser = await createUser(data, userType)
      return { success: true, user: newuser, message: "success" }

    } catch (error) {
      console.error('Error in googleSinUpVerifyUsecase:', error.message);
      throw new Error('email already exist');
    }

  }
  return { executeFunction }
}