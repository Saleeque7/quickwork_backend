export const savedjobUseCase = (dependencies) => {
    const { repositories : {repository : {getSavedJobs}}} = dependencies

    const execute = async(userId,page,limit) => {
        const skip = (page - 1) * limit;
        const{ savedJobs,totalSavedJobs} = await getSavedJobs(userId,skip,limit)
        const totalPages = Math.ceil(totalSavedJobs / limit)

          return {result:savedJobs,totalPages}
    }
    return { execute }
}