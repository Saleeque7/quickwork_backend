export const notificationUsecase = (dependencies)=>{
    const { repositories: { repository :{ browseNotifications }} } = dependencies
    const execute  = async(id)=>{
        const result  = await browseNotifications(id)
        if(!result){
            throw new Error("error in useCase")
        }
        return result
    }
    return {execute}
}