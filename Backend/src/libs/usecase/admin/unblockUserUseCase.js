export const unblockUserUseCase = (dependencies) => {
    const { repositories: { adminRepository: { findUserByIdAndUpdate } } } = dependencies;

    const execute = async (userId) => {
        try {
            const action = "unblock"
            const user = await findUserByIdAndUpdate(userId , action);
            return user;
        } catch (error) {
            console.error(`Error blocking user`, error);
            throw error;  
        }
    };

    return { execute };
};
