
import axios from 'axios'
import { maskEmail } from '../../utils/helpers/maskEmail.js';
export const gitUserInfoUsecase = (dependencies) => {
  const {
    repositories: {
      loginRepository: { findUserByEmail, findClientByEmail, createGituser  },
    },
  } = dependencies;
  const executeFunction = async (auth, userType) => {
    try {
      const res = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: auth,
        },
      });
      const emailRes = await axios.get("https://api.github.com/user/emails", {
        headers: {
          Authorization: auth,
        },
      });

      const userInfo = res.data
      const userEmail = emailRes.data
      const [{ email: email }] = userEmail

      const user = await findUserByEmail(email)
      const client = await findClientByEmail(email)
      const existEmail = user || client
      const maskedEmail =  maskEmail(email)

   


      if (existEmail && existEmail.isGithub) {
        return {
          success: true,
          person: existEmail,
        }
      }else if(existEmail && !existEmail.isGithub && !existEmail.isGoogle){
        return {
          success: false,
          message:`That Git-hub account ${maskedEmail} isn't currently associated with an QuickWork account. Log in using your QuickWork login first, then link your Github account for future use`
         
        }
      }
       else if (!existEmail) {
        const person = await createGituser(userInfo, userEmail, userType)
        return {
          success: true,
          person,
        };
      }
      else {
        return {
          success: false,
          message: `An account with the email ${maskedEmail} already in use with another provider`
        }
      }

    } catch (error) {
      console.error('Error in gitUserInfoUsecase:', error.message);
    }
  }
  return { executeFunction }
}