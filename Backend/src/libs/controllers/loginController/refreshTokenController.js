import { generateToken } from "../../utils/Jwt/generateToken.js";

export default (dependencies) => {
  const refreshTokenController = async (req, res) => {
    const { use_case: { refreshTokenuseCase } } = dependencies;

    try {
      console.log(req.cookies, "cookie");
      console.log(req.body, "request body");

      const refreshToken = req.body.token;
      const cookieToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
      }

      const { executeFunction } = await refreshTokenuseCase(dependencies);
      const result = await executeFunction(refreshToken, cookieToken);

      if (!result.success) {
        return res.status(403).json({ message: result.message });
      }

      let role = "admin"; 
      if (result.person.job_role) {
        if (result.person.job_role === "freelancer") {
          role = "user";
        } else {
          role = "client";
        }
      }

      const token = generateToken(res, result.person._id, role);

      res.status(200).json({ accessToken: token.accessToken, refreshToken: token.refreshToken });
    } catch (error) {
      console.error("Error in refreshTokenController:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  return refreshTokenController;
};
