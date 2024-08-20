export const editjobSubmitUseCase = (dependencies) => {
    const { repositories: { clientRepository: { editJobrequest } } } = dependencies;
  
    const execute = async (data, clientId , jobId , action) => {
      try {
        console.log(data,"usecase");
        const jobPost = await editJobrequest(data, clientId , jobId , action);
        return jobPost;
      } catch (error) {
        console.error("Error in editjobSubmitUseCase:", error);
        throw error;
      }
    };
  
    return { execute };
  };
  