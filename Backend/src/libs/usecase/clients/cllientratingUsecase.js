export const cllientratingUsecase = (dependencies) => {
    const { repositories: { clientRepository: { rating } } } = dependencies;


    const execute = async(data ,client) => {
        try {
            const res = await rating(data,client)
            return res
        } catch (error) {
            console.error("error message");
            
        }
    }
    return { execute }
}
