export default (dependencies) => {
    const saveAddressController = async(req,res) => {
        const {use_case : { saveAddressUsecase }} = dependencies
        try {
            const {execute} = await saveAddressUsecase(dependencies)
           const {address , city ,state , postal } =  req.body
           const addressData = {
            address , city ,state , postal
           }
           const  clientId = req.clientId

           const result = await execute(addressData , clientId)

           console.log(result,"controller");
           
           if(!result){
            res.status(401).json({message:"error in saveAddress Controller"})
           }
           res.status(200).json(result)
        } catch (error) {
            res.status(500).json({message:"error in saveAddressController"})
        }
    }
    return saveAddressController
}