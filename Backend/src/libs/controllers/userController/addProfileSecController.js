export default (dependencies) => {
    const addProfileSecController = async (req, res) => {
        const { use_case: { addProfilesecUseCase } } = dependencies;
        try {
            const { execute } = addProfilesecUseCase(dependencies);
            const userId = req.userId
            console.log(userId ,"indo");
            const result = await execute(req.body, userId);

            if (!result.success) {
                return res.status(400).json({ message: result.message }); 
            }

            return res.status(201).json({ user: result.user });
        } catch (error) {
            console.error("Error in addProfileSecController:", error);
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    };
    return addProfileSecController;
};
