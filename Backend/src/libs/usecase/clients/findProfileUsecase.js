export const findProfileUsecase = (dependencies) => {
    const { repositories: { clientRepository: { findProfile } } } = dependencies;

    const execute = async (user) => {
        try {
            const result = await findProfile(user)
            return result
        } catch (error) {
            console.error("Error in findProfileUsecase:", error);
            throw error;
        }
    }
    return { execute }
}