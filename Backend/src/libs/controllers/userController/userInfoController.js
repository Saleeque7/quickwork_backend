export default (dependencies) => {
    const {use_case : {userinfoUsecase}} = dependencies
    const userInfoController  =async(req,res)=>{
        try {
            const user = req.userId
            const { execute } = await userinfoUsecase(dependencies)
            const result = await execute(user)
            if(!result){
                return res.status(401).json("error in fetching user information")
            }
            return res.status(200).json(result)
        
      } catch (error) {
        console.error(error,"error in userInfoController");
        return res.status(500).json(error)
      }
    }
    return userInfoController
}