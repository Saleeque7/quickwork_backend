export default (dependencies) => {
    const { use_case: { isUserprofileUseCase },
} = dependencies;
    const isUserprofileController = async(req,res)=>{
        const {execute} = isUserprofileUseCase(dependencies)
        try {
            const userId = req.userId
            const response = await execute(userId)
            if(!response.success){
                return res.status(401).json({message :response.message})
              }
              console.log(response,"controller");
        
              return res.status(200).json({success:true ,message:"success",user:response.user})

        } catch (error) {
            console.error("Error isUserprofileController:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    return isUserprofileController
}