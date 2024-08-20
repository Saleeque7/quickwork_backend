export const alljobproposalsUsecase= (dependencies) => {
    const {repositories:{repository : {alljobproposals}}} = dependencies

    const execute = async(user,searchQuery,page,limit)=>{

        const skip = (page - 1) * limit;
        const {proposals ,count } = await alljobproposals(user,searchQuery,skip,limit)
        const Pages = Math.ceil(count / limit)
        return {
            proposals,
            Pages
        }
    }
    return { execute }
}