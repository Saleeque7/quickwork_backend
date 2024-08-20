export const getJobPostUsecase =(dependencies)=>{
    const {repositories : {repository : {getjobcards , getMatchingjobcards }}} = dependencies
    const execute = async(heading , userId,page,limit)=>{

        try {
            const skip = (page - 1) * limit;

            if(heading === "Most Recent"){

                const { jobCards, total } =  await getjobcards(skip,limit)
                const totalPages = Math.ceil(total / limit)
                return {result:jobCards,totalPages}

            }else if (heading === "Best Matches"){
                const { matchedJobs, total } =  await getMatchingjobcards(userId,skip,limit)
                const totalPages = Math.ceil(total / limit)
                return {result:matchedJobs,totalPages}
            }
           
        } catch (error) {
            console.error("error in getjobPostuseCase");
        }
    }
    return {execute}
}