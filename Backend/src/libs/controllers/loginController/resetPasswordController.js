export default (dependencies) => {
  const {
    use_case: { resetPasswordUsecase },
  } = dependencies;
  const resetPasswordController = async (req, res) => {
    try {
      const { email, password } = req.body;

      const { executePassword } = await resetPasswordUsecase(dependencies);
      const result = await executePassword(email, password);

      if (!result) {
        return res
          .status(404)
          .json({ success: false, message: "error in password change" });
      }
      return res
        .status(200)
        .json({ success: true, message: "success", otp: null });
    } catch (error) {
      console.error("Error:", error);
      const statusCode = error.status || 500;
      return res
        .status(statusCode)
        .json({ message: error.message || "Internal server error" });
    }
  };
  return resetPasswordController;
};
