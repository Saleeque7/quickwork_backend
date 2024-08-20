export const  userContractUsecase = (dependencies) => {
    const { repositories: { repository :{ getuserContracinfo} } } = dependencies

    const execute = async(id) => {
        const result  =await getuserContracinfo(id)
        return result
    }
    return { execute }
}