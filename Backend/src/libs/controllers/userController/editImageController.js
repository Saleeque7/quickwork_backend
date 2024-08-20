export default (dependencies) => {
  const { use_case : {editImageUsecase}} = dependencies
    const editImageController = async (req, res) => {
        try {
          const { execute } = await editImageUsecase(dependencies)
   
          console.log(req.file,"file");
          
          const userId = req.userId
          const { location , key} = req.file
          const image = { location , key }
          const result = await execute(userId , image)

          if(!result){
            return res.status(403).json({message:"error in while edit userProfile"})
          }
          
          return res.status(200).json(result);
        } catch (error) {
          console.error("Error in editImageController:", error);
         return  res.status(500).json({ error: "Internal server error" });
        }
      }
    return editImageController
}