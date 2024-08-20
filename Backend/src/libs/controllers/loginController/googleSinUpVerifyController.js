import { generateToken } from "../../utils/Jwt/generateToken.js";

export default (dependencies) => {
  const {
    use_case: { googleSinUpVerifyUsecase },
  } = dependencies;
  const googleSinUpVerifyController = async (req, res) => {
    const { executeFunction } = googleSinUpVerifyUsecase(dependencies);
    try {
      const { userType } = req.body;
      const result = await executeFunction(userType, req.body.data);
      if (!result.success) {
        console.error(
          "Registration failed in googleSinUpVerifyController :",
          result.message
        );
        res.status(400).json({ success: false, message: result.message });
        return;
      }
      const userRole = result.user.job_role === "freelancer" ? "user" : "client"
      const {accessToken , refreshToken } = await generateToken(res,result.user._id,userRole);

      res
        .status(200)
        .json({
          success: true,
          user: result.user,
          accessToken: accessToken,
          refreshToken: refreshToken,
          message:result.message  ,
        });
    } catch (error) {
      console.error("Error in googleSinUpVerifyController:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  return googleSinUpVerifyController;
};
