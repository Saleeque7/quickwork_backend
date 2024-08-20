import express from "express";
import { loginAuthController } from "../../libs/controllers/index.js";
export default (dependencies) => {
  const {
    loginController,
    forgotPasswordController,
    forgotVerifyOtpController,
    otpResendOtpController,
    resetPasswordController,
    refreshTokenController,
    googleSinUpVerifyController,
    googleLoginController,
    gitHubController,
    gitUserInfoController,
    gitLoginController
  } = loginAuthController(dependencies);
  const router = express.Router();

  router.post("/login", loginController);
  router.post("/forgot-password", forgotPasswordController);
  router.post("/verifyPassword-otp", forgotVerifyOtpController);
  router.post("/resend-otp", otpResendOtpController);
  router.post("/reset-password", resetPasswordController);
  router.post("/refresh", refreshTokenController);
  router.post("/googleSignup", googleSinUpVerifyController);
  router.post("/googleLogin",googleLoginController)
  router.get("/gitAccessToken",gitHubController)
  router.get("/githubSignup",gitUserInfoController)
  router.get("/githubLogin",gitLoginController)

  return router;
};
