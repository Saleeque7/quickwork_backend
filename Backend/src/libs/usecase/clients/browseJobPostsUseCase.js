export const browseJobPostsUseCase = (dependencies)=>{
    const execute = async(id,searchQuery,page,limit)=>{
    const { repositories: {clientRepository: {browseJobPostsapi} } } = dependencies
        try {
            const skip = (page-1)*limit
            const res  = await browseJobPostsapi(id,searchQuery,skip,limit)
            const totalPages = Math.ceil(res.total /limit)
            return {
                jobposts:res.jobDetails,
                totalPage:totalPages
            }
        } catch (error) {
            console.error('Error browsing job posts:', error);
            
        }
    }
    return {execute}
}