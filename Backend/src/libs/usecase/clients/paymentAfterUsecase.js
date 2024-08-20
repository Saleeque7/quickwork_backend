export const paymentAfterUsecase = (dependencies) => {
  const { repositories: { clientRepository: { paymentafterEdit, paymentToWallet  } } } = dependencies;
  const execute = async (id, walletInfo, clientId) => {
    try {
    
      const { walletId , transaction } = await paymentToWallet(walletInfo, clientId);
      if (walletId && transaction) {
        const result = await paymentafterEdit(id,walletId);
        return transaction;
      }
    } catch (error) {
      console.error('Error in paymentAfterUsecase', error);
      throw error;
    }
  };
  return { execute };
};
