import { generateToken } from "../../utils/Jwt/generateToken.js"

export default (dependencies) => {
    const {use_case:{ adminAuthuseCase }} = dependencies
    const adminAuthController =async(req,res)=>{
        const {executeFunction } = adminAuthuseCase(dependencies)
        try {
          
            const { passwordMatch, person } = await executeFunction(req.body);

            if (!person) {
              return res.status(404).json({success:false ,  message: "Email does not exist" });
          }
          if (!passwordMatch) {
              return res.status(401).json({success:false , message: "Password does not match" });
          }
          if(!person.isAdmin){
            return res.status(401).json({success:false , message: "admin not found" });
          }
          const role  = "admin"
           const {accessToken , refreshToken } = generateToken(res, person.id,role);
            res.status(200).json({
              success: true,
              message: " login successful",
              person:person,
              accessToken:accessToken,
              refreshToken:refreshToken
            });
        } catch (error) {
            console.error("Error in adminAuthController:", error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({ message: error.message || "Internal server error" });
        }
    }
    return adminAuthController
}