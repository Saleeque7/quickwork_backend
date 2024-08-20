export const blockUserUseCase = (dependencies) => {
    const { repositories: { adminRepository: { findUserByIdAndUpdate } } } = dependencies;

    const execute = async (userId) => {
        try {
            const action = "block"

            const user = await findUserByIdAndUpdate(userId ,action);
            return user;
        } catch (error) {
            console.error(`Error blocking user`, error);
            throw error;  
        }
    };

    return { execute };
};
