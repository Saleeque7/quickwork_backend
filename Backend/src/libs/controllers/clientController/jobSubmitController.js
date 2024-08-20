export default (dependencies) => {
    const jobSubmitController = async (req, res) => {
      const { use_case: { jobSubmitUseCase } } = dependencies;
      try {
        const data = req.body;
        const clientId = req.clientId;
  
        const { execute } = jobSubmitUseCase(dependencies);
        const result = await execute(data, clientId);
  
        res.status(200).json({ message: "Job submitted successfully", jobPost: result });
      } catch (error) {
        console.error("error in jobSubmitController:", error);
        res.status(500).json({ message: "Error in jobSubmitController" });
      }
    };
    return jobSubmitController;
  };
  