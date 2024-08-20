export default (dependencies) => {
    const {
        use_case: { clientAuthUsecase },
    } = dependencies;
    const {
        repositories: {
            repository:{findUserByEmail} ,
            clientRepository: { findClientByEmail },
        },
    } = dependencies;
    const clientAuthController = async (req, res) => {
        try {
            const { name, email, password, phone, job_role } = req.body;
            const userExist = await findUserByEmail(email);
            const clientExist = await findClientByEmail(email);
            if (!userExist && !clientExist) {
                const { executeFunction } = await clientAuthUsecase(dependencies);
                const otp = await executeFunction(email ,name)
                console.log(otp ,"otp");
                return res
                    .status(200)
                    .json({ success: true, message: " Please verify otp !!", otp: otp });
            } else { 
                throw { status: 409, message: "Email already exists" };
            }
        } catch (error) {
            console.error("Error:", error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({ message: error.message || "Internal server error" });
        }
    };
    return clientAuthController;
};
