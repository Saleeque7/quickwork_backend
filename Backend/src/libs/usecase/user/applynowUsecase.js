export const applynowUsecase = (dependencies)=> {
    const {repositories : {repository : { applyJob }}} = dependencies

    const execute = async(data ,user)=>{
        try {
            const res = await applyJob(data ,user)
            return res
        } catch (error) {
            console.error(error,"error in applyUsecase");
        }
    }
    return {execute}
}