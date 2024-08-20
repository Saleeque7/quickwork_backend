export default (dependencies) => {
    const { use_case: { unblockUserUseCase } } = dependencies;
    const unblockUserController = async (req, res) => {
        const { execute } = unblockUserUseCase(dependencies);
        try {
            const userId = req.query.id;
            const user = await execute(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({ user });
        } catch (error) {
            console.error("Error in unblockUserUseCase:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
    return unblockUserController;
};
