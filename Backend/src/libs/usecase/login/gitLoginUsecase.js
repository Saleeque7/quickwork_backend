import axios from 'axios'
import {maskEmail} from '../../utils/helpers/maskEmail.js'

export const gitLoginUsecase = (dependencies) => {
    const {
        repositories: {
            loginRepository: { findUserByEmail, findClientByEmail },
        },
    } = dependencies;
    const executeFunction = async (auth) => {
        try {
            const emailRes = await axios.get("https://api.github.com/user/emails", {
                headers: {
                    Authorization: auth,
                },
            });

            const userEmail = emailRes.data
            const [{ email: email }] = userEmail
            const user = await findUserByEmail(email)
            const client = await findClientByEmail(email)
            const existEmail = user || client
            const maskedEmail = await maskEmail(email)
            if (existEmail) {

                if (existEmail.isGithub && existEmail.isVerified) {
                    return {
                        success: true,
                        person: existEmail,
                    }
                }
                else {
                    return {
                        success: false,
                        message: `An account with the email ${email} already in use with another provider`
                    }
                }
            } else {
                return {
                    success: false,
                    message: ` Git-Hub account ${maskedEmail} is not recognized for Git-Hub Sign-In on Quickwork. Please make sure you are using the same account that you have previously linked.`
                   
                };
            }

        } catch (error) {
            console.error('Error in gitLoginUsecase:', error.message);

        }
    }
    return { executeFunction }
}