export const blockclientUseCase = (dependencies) => {
    const { repositories: { adminRepository: { findclientByIdAndUpdate } } } = dependencies;

    const execute = async (clientId) => {
        try {
            const action = "block"

            const client = await findclientByIdAndUpdate(clientId ,action);
            return client;
        } catch (error) {
            console.error(`Error blocking client`, error);
            throw error;  
        }
    };

    return { execute };
};
