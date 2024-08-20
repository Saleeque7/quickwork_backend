export const disLikejobUsecase  = (dependencies) => {
    const {repositories : {repository :{ disLikeJob}}} = dependencies

    const execute = async(jobId, userId)=>{
        const result = await disLikeJob(jobId , userId)
        return result
    }
    return { execute }
}