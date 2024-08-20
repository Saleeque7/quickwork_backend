export default (dependencies) => {
    const verifyotpController = async (req, res) => {
        const { use_case: { verifyotpUsecase  } } = dependencies
        const {
            repositories: {
                repository: { createUser  },
                clientRepository:{ createClient }
            },
        } = dependencies;
        try {
            const userData = req.body.userData
            const { otp, enteredotp } = req.body
            const { executeFunction } = await verifyotpUsecase(dependencies)
            const { isVerified, userInfo } = await executeFunction(otp, enteredotp, userData)
            if (!isVerified) return res.status(401).json({ success: false, message: "otp is not matching" })
                if (userInfo.job_role === "freelancer") {
                    const user = await createUser(userInfo);
                    if (user) {
                        return res.status(200).json({ success: true, message: "User Registration successful" });
                    }
                } else if (userInfo.job_role === "client") {
                    const client = await createClient(userInfo);
                    if (client) {
                        return res.status(200).json({ success: true, message: "Client Regitration successful" });
                    }
                }
                return res.status(500).json({ success: false, message: "Unable to create user or client" });
        } catch (error) {
            console.error("An error occurred:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
    return verifyotpController
}