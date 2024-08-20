export const browseJobUsecase = (dependencies)=>{
    const execute = async(id)=>{
    const { repositories: {clientRepository: {browseJobapi} } } = dependencies
        try {
            const jobPost = await browseJobapi(id)
           return jobPost;
        } catch (error) {
            console.error('Error browsing job posts:', error);
        }
    }
    return {execute}
}