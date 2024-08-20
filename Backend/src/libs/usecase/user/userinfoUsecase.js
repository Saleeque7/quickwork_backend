export const userinfoUsecase = (dependencies) => {
    const { repositories: { repository :{ findUserById} } } = dependencies
    const execute = async (user) => {
        const res = await findUserById(user)
        return  res
    }
    return { execute }
}