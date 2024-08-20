export const deleteproposalUsecase = (dependencies) => {
    const { repositories: { repository: { deleteProposal } } } = dependencies;
  
    const execute = async (proposalId, userId) => {
      try {
        const result = await deleteProposal(proposalId, userId);
        return result;
      } catch (error) {
        console.error("Error in deleteproposalUsecase:", error);
        throw error;
      }
    };
  
    return { execute };
  };
  