export default (dependencies) => {
    const { use_case: { verifypaymentuseCase } } = dependencies;
    const verifypaymentController = async (req, res) => {
      const { execute } = await verifypaymentuseCase(dependencies);
      try {
        const {
          razorpayPaymentId,
          razorpayOrderId,
          razorpaySignature,
        } = req.body;
  
        const isValid = await execute(razorpayPaymentId, razorpayOrderId, razorpaySignature);
  
        if (!isValid) {
          return res.status(400).json({ msg: "Transaction not legit!" });
        }
  
        return res.status(200).json({
          msg: "success",
          orderId: razorpayOrderId,
          paymentId: razorpayPaymentId,
        });
      } catch (error) {
        return res.status(500).json(error);
      }
    };
    return verifypaymentController;
  };