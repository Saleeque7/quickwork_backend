
export const registerUsecase = (dependencies) => {
    const { repositories: { adminRepository: { createAdmin } } } = dependencies;
    
    const executeFunction = async (data) => {
        try {
            const result = await createAdmin(data);

            if (result) {
                return {
                    success: true,
                    message: "Admin registration successful"
                };
            } else {
                return {
                    success: false,
                    message: "Admin registration failed"
                };
            }
        } catch (error) {
            console.error('Error during admin registration:', error);
            return {
                success: false,
                message: "Error during admin registration",
                error: error.message
            };
        }
    };

    return { executeFunction };
};
