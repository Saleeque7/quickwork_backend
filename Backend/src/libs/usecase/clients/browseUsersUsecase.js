export const browseUsersUsecase  =(dependencies)=>{
    const { repositories: {clientRepository: {browseUsers} } } = dependencies
const execute =async(searchQuery , page , limit) => {
    const skip = (page - 1) * limit;
    console.log(skip,"skip");
    
    const { total , users } = await browseUsers(searchQuery,skip,limit)
    const totalpage = Math.ceil(total / limit)
    return {
        totalpage,
        users
    }
}
return {execute}
}