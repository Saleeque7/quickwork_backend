export default (dependencies) => {
    const { use_case: { blockclientUseCase } } = dependencies;
    const blockclientController = async (req, res) => {
        const { execute } = blockclientUseCase(dependencies);
        try {
            const clientId = req.query.id;
            const client = await execute(clientId);
            if (!client) {
                return res.status(404).json({ message: "client not found" });
            }
            return res.status(200).json({ client });
        } catch (error) {
            console.error("Error in blockclientController:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
    return blockclientController;
};
