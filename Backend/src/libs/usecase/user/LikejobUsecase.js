export const LikejobUsecase  = (dependencies) => {
    const {repositories : {repository :{ LikeJob}}} = dependencies

    const execute = async(jobId, userId)=>{
        const result = await LikeJob(jobId , userId)
        return result
    }
    return { execute }
}