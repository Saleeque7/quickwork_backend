import { generateToken } from "../../utils/Jwt/generateToken.js";

export default (dependencies) => {
  const {
    use_case: { loginUsecase },
  } = dependencies;
  
  const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
      const { executeFunction } = loginUsecase(dependencies);
      const { passwordMatch, person , isBlock } = await executeFunction(email, password);

      if (isBlock) {
        return res.status(403).json({ success: false, message: "User is blocked" });
      }

      if (!person) {
        return res.status(404).json({success:false ,  message: "Email does not exist" });
    }
    if (!passwordMatch) {
        return res.status(401).json({success:false , message: "Password does not match" });
    }
    const userRole = person.job_role === "freelancer" ? "user" : "client"
    const {accessToken , refreshToken } = generateToken(res,person._id,userRole);

      res.status(200).json({
        success: true,
        message: " login successful",
        person:person,
        accessToken:accessToken,
        refreshToken:refreshToken
      });
    } catch (error) {
      console.error("Error in loginController:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  return loginController;
};
