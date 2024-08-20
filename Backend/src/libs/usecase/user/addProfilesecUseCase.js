export const addProfilesecUseCase = (dependencies) => {
    const {
        repositories: {
            repository: { findUserAndaddInfo },
        },
    } = dependencies;
    const execute = async (data, userId) => {
        try {
            const result = await findUserAndaddInfo(data, userId)
            if (!result) {
                return {
                    success: false,
                    message: "Error in saving user data",
                };
            }

            return {
                success: true,
                user: result,
            };
        } catch (error) {
            console.error("Error in addProfileSectionUseCase:", error);
            return {
                success: false,
                message: "An error occurred while updating the user profile",
                error: error.message,
            };
        }
    };

    return { execute };
};