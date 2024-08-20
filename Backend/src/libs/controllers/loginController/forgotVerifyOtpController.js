export default (dependencies) => {
  const {
    use_case: { forgotVerifyOtpUseCase },
  } = dependencies;
  const forgetVerifyOtpController = async (req, res) => {
    const { otp, enteredotp } = req.body;
    try {
      const { executeFunction } = await forgotVerifyOtpUseCase(dependencies);
      const isMatch = await executeFunction(otp, enteredotp);
      if (!isMatch) {
        return res.status(401).json({ message: "otp does not match" });
      }
      return res
        .status(200)
        .json({ success: true, message: "otp verification success" });
    } catch (error) {
      console.error("Error:", error);
      const statusCode = error.status || 500;
      return res
        .status(statusCode)
        .json({ message: error.message || "Internal server error" });
    }
  };
  return forgetVerifyOtpController;
};
