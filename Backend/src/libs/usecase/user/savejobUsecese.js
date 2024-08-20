export const savejobUsecese = (dependencies) => {
    const { repositories : {repository : {saveJob}}} = dependencies
    const execute  = async (job,userId)=>{ 
        const result = await saveJob(job,userId)
        return result
    }
    return { execute }
}