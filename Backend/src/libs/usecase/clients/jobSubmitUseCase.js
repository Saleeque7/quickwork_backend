export const jobSubmitUseCase = (dependencies) => {
    const { repositories: { clientRepository: { createJobrequest } } } = dependencies;
  
    const execute = async (data, clientId) => {
      try {
        console.log(data,"usecase");
        const jobPost = await createJobrequest(data, clientId);
        return jobPost;
      } catch (error) {
        console.error("Error in jobSubmitUseCase:", error);
        throw error;
      }
    };
  
    return { execute };
  };
  