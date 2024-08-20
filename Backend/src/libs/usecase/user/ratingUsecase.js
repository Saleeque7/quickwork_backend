export const ratingUsecase = (dependencies) => {
    const { repositories: { repository :{ rating }} } = dependencies

    const execute = async(data ,user) => {
        try {
            const res = await rating(data,user)
            return res
        } catch (error) {
            console.error("error message");
            
        }
    }
    return { execute }
}
