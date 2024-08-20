import { comparePassword } from "../../utils/helpers/hashPassword.js";

export const loginUsecase = (dependencies) => {
  const {
    repositories: {
      loginRepository: { findUserByEmail, findClientByEmail },
    },
  } = dependencies;
  if (!findUserByEmail || !findClientByEmail) {
    throw new Error("loginRepository error");
  }

  const executeFunction = async (email, password) => {
    try {
      const user = await findUserByEmail(email);
      const client = await findClientByEmail(email);
      if (user && user.password) {
        if(user.isBlock){
          return {
            isBlock:true,
            passwordMatch: false,
            person: null,
          }
        }
        const passwordMatch = await comparePassword(password, user.password);

        return {
          passwordMatch,
          person: user
        };
      } else if (client && client.password) {
        if(client.isBlock){
          return {
            isBlock:true,
            passwordMatch: false,
            person: null,
          }
        }
        const passwordMatch = await comparePassword(password, client.password);
        return {
          passwordMatch,
          person: client,
        };
      } else {
        return {
          passwordMatch: false,
          person: null,
        };
      }
    } catch (error) {
      console.error("Error in loginUsecase:", error.message);
      throw new Error("Error ");
    }
  };
  return { executeFunction };
};
