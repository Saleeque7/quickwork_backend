export default (dependencies) => {
  const { use_case: { addProfileUseCase } } = dependencies;
  
  const addProfileController = async (req, res) => {
    const userId = req.userId
    const { name, email, phone, dateOfBirth, place } = req.body
    const { key, location } = req.file
    const image = { key, location }
    const userInfo = { name, email, phone, dateOfBirth, place ,image :image}
    const { executeFunction } = addProfileUseCase(dependencies);

    try {

      const response = await executeFunction(userId, userInfo)
      if(!response.success){
        return res.status(401).json({message :response.message})
      }
      console.log(response,"controller");

      return res.status(200).json({success:true ,message:"success",user:response.user})

    } catch (error) {
      console.error("Error addProfileController:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  return addProfileController;
};
