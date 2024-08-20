export default (dependencies)=> {
  const { use_case: { experienceUsecase },
} = dependencies;
    const experienceController = async(req,res) => {
       const {execute} =  experienceUsecase(dependencies)
       try {
        const userId = req.userId
         const response = await execute(userId ,req.body)
         if(!response.success){
          return res.status(401).json({message :response.message})
        }
        console.log(response,"controller");
  
        return res.status(200).json({success:true ,message:"success",user:response.user})
       } catch (error) {
        res.status(500).json({message:error.message})
       }
    }
    return experienceController
}