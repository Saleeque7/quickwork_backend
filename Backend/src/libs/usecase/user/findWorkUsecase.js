export const findWorkUsecase = (dependencies) => {
    const {
        repositories: {
            repository: { findWorks  },
        },
    } = dependencies;
    const execute = async (searchQuery  ,page,limit) => {
        const skip = (page - 1) * limit;
        const { jobPosts , count} = await findWorks(searchQuery,skip,limit)
        const totalPages = Math.ceil(count / limit)
        return {
            jobPosts, 
            totalPages 
        }
    }
    return { execute }
}