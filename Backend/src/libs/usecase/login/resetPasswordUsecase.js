import { hashuserPassword } from "../../utils/helpers/hashPassword.js";
export const resetPasswordUsecase = (dependencies) => {
  const {
    repositories: {
      loginRepository: { changepassword },
    },
  } = dependencies;
  const executePassword = async(email, newPassword) => {
    try {
            const Password = await hashuserPassword(newPassword)
            const result = await changepassword(email , Password)
            return result
        
    } catch (error) {
      console.error("Error in resetPasswordUsecase:", error.message);
      throw new Error("Error in change password");
    }
  };
  return { executePassword };
};
