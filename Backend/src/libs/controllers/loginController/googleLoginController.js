import { generateToken } from "../../utils/Jwt/generateToken.js";

export default (dependencies) => {
    const googleLoginController = async (req, res) => {
        const { use_case: { googleLoginUseCase } } = dependencies
        const { email } = req.body.data

        try {
            const { executeFunction } = await googleLoginUseCase(dependencies)
            const result = await executeFunction(email)
            if (!result.success) {
                console.error("login failed in googleLoginController :", result.message);
                res.status(400).json({ success: false, message: result.message });
                return;
            }
            const userRole = result.user.job_role === "freelancer" ? "user" : "client"
            const { accessToken, refreshToken } = await generateToken(res, result.user._id, userRole);
            return res.status(200).json({
                success: true, user: result.user, message: "login successFull", accessToken: accessToken,
                refreshToken: refreshToken,
            })
        } catch (error) {
            console.error("Error in googleLoginController:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    return googleLoginController
}