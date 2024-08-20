export const unsavejobUsecese = (dependencies) => {
    const { repositories : {repository : {unsaveJob}}} = dependencies
    const execute  = async (job,userId)=>{ 
        const result = await unsaveJob(job,userId)
        return result
    }
    return { execute }
}