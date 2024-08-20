export default (dependencies) => {
    const { use_case: { registerUsecase } } = dependencies;

    const registerController = async (req, res) => {
        const data = req.body;
        const { executeFunction } = registerUsecase(dependencies);
        
        try {
            const result = await executeFunction(data);
            if (result.success) {
                return res.status(200).json({ success: true, message: result.message });
            } else {
                return res.status(400).json({ success: false, message: result.message });
            }
        } catch (error) {
            console.error('Error in registerController:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
        }
    };

    return registerController;
};
