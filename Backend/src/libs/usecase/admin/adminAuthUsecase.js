import { comparePassword } from "../../utils/helpers/hashPassword.js"
export const adminAuthuseCase = (dependencies) => {
    const { repositories: { adminRepository: { findAdminByEmail } } } = dependencies
    const executeFunction = async (data) => {
        try {
            const { email, password } = data
            const admin = await findAdminByEmail(email)
            if (admin && admin.password) {
                const passwordMatch = await comparePassword(password, admin.password);  
                return {
                    passwordMatch,
                    person: admin,
                };
            } else {
                return {
                    passwordMatch: false,
                    person: null,
                };
            }
        } catch (error) {
            console.error("Error in adminAuthuseCase:", error.message);
            throw new Error("Error ");
        }
    }
    return { executeFunction }
}