
export const transactionUsecase = (dependencies) => {
    const { repositories: {clientRepository: { findTransaction } } } = dependencies
    const execute = async(id , client) => {    
        try {
            const res = await findTransaction(id , client);
            if (!res) {
                console.error(`Transaction not found for id: ${id} and client: ${client}`);
                return null;
            }
            return res;
        } catch (error) {
            console.error("Error in transactionUsecase:", error);   
            throw error;
        }
    }
    return { execute }
}