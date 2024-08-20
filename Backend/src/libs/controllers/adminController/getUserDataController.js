export default (dependencies) => {
    const {use_case:{ getUserDataUseCase }} = dependencies
    const getUserDataController = async(req, res) =>{
        const {executeFunction} = getUserDataUseCase (dependencies)
        try {
            const result = await executeFunction()
            if(!result){
                return res.status(401).json({message :"users not found"})
            }

            return res.status(200).json({users:result})
            
        } catch (error) {
            console.error("error in getUserDataUseCase",error);
        }
    }
    return getUserDataController
}