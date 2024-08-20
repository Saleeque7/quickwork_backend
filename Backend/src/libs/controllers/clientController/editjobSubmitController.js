export default (dependencies) => {
    const editjobSubmitController = async (req, res) => {
      const { use_case: { editjobSubmitUseCase } } = dependencies;
      try {
        const data = req.body.formData;
        const jobId = req.body.jobId;
        const action = req.body.action;
        const clientId = req.clientId;
  
        const { execute } = editjobSubmitUseCase(dependencies);
        const result = await execute(data, clientId , jobId , action);
  
        res.status(200).json({ message: "Job submitted successfully", jobPost: result });
      } catch (error) {
        console.error("error in editjobSubmitController:", error);
        res.status(500).json({ message: "Error in editjobSubmitController" });
      }
    };
    return editjobSubmitController;
  };
  