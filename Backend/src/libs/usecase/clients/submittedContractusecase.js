
export const submittedContractUseCase = (dependencies) => {
    const { repositories: { clientRepository: { submittedContract } } } = dependencies;
  
    const execute = async (client,searchQuery) => {
      try {
        const result = await submittedContract(client,searchQuery);
        return result;
      } catch (error) {
        console.error('Error executing submittedContract use case:', error);
        throw new Error('Unable to execute submittedContract use case');
      }
    };
  
    return { execute };
  };
  