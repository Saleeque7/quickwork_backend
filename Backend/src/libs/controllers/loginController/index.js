
import loginController from "./loginController.js";
import forgotPasswordController from "./forgotPasswordController.js";
import forgotVerifyOtpController from "./forgotVerifyOtpController.js";
import otpResendOtpController from "./otpResendOtpController.js";
import resetPasswordController from "./resetPasswordController.js";
import refreshTokenController from "./refreshTokenController.js";
import googleSinUpVerifyController from "./googleSinUpVerifyController.js";
import googleLoginController from "./googleLoginController.js";
import gitHubController from "./gitHubController.js";
import gitUserInfoController from "./gitUserInfoController.js";
import gitLoginController from "./gitLoginController.js";

export default (dependencies) =>{
    return {
        loginController :loginController(dependencies),
        forgotPasswordController:forgotPasswordController(dependencies),
        forgotVerifyOtpController:forgotVerifyOtpController(dependencies),
        otpResendOtpController:otpResendOtpController(dependencies),
        resetPasswordController:resetPasswordController(dependencies),
        refreshTokenController:refreshTokenController(dependencies),
        googleSinUpVerifyController:googleSinUpVerifyController(dependencies),
        googleLoginController:googleLoginController(dependencies),
        gitHubController:gitHubController(dependencies),
        gitUserInfoController:gitUserInfoController(dependencies),
        gitLoginController:gitLoginController(dependencies)
    }
}