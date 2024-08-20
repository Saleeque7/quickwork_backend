export default (dependencies) => {
    const { use_case: { stripePaymentusecase } } = dependencies;
    
    const stripePaymentController = async (req, res) => {
      try {
        const { amount, amountInINR, customerDetails,contractId,initiationfee } = req.body;
        const clientId = req.clientId
        const walletData = {amountInINR ,contractId ,initiationfee }
        const { execute } = stripePaymentusecase(dependencies);
        
        
        const session = await execute(amount, customerDetails , walletData  , clientId);
        
        if (!session || !session.id) {
          return res.status(400).json({ message: "Failed to create Stripe payment session" });
        }
  
        return res.status(200).json({ sessionId: session.id });
      } catch (error) {
        console.error("Error in stripePaymentController:", error);
        return res.status(500).json({ error: error.message });
      }
    };
    
    return stripePaymentController;
  };
  