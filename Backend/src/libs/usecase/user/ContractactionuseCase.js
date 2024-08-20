export const ContractactionuseCase = (dependencies) => {
    const {repositories : {repository :{ Contractaction}}} = dependencies
    const execute = async(id , action) => {
       const result =  await Contractaction(id,action)
       if(!result){
        throw new Error("error in ContractactionuseCase")
       }
       return result
    }
    return {execute}
}