export default (dependencies) => {
    const createContractController = async(req,res) => {
        const {userId ,proposalId , jobId ,budgetType , contractAmount ,paymentOption ,hoursOfWork , contractDueDate ,milestones ,contractTitle } = req.body
       
        const {location , key} = req.file
        
        const projectFile = {location , key}
        const client = req.clientId
        const {use_case : {createContractuseCase}} = dependencies
        try {
            const {execute} = await createContractuseCase(dependencies)
            const userData = {
                userId,
                client,
                contractTitle,
                proposalId,
                jobId,
                budgetType,
                contractAmount,
                paymentOption,
                hoursOfWork,
                contractDueDate,
                milestones,
                projectFile
            }
            const result = await execute(userData)
            if(!result){
                res.status(401).json({success:false , message:"error in createContract"})
            }
            res.status(200).json({success:true,message:"success",contract:result})
        } catch (error) {
            console.log(error,"error in contract controller");
            res.status(500).json({message:error.message})
        }
   
    }
    return createContractController
}