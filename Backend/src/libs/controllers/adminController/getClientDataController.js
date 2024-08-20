export default (dependencies) => {
    const {use_case:{ getClientDataUseCase }} = dependencies
const getClientDataController = async(req,res) => {
    const {executeFunction} = getClientDataUseCase (dependencies)

    try {
        const result = await executeFunction()
        if(!result){
            return res.status(401).json({message :"users not found"})
        }

        return res.status(200).json({clients:result})
        
    } catch (error) {
        console.error("error in getUserDataUseCase",error);
    }
}
return getClientDataController
}