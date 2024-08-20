export default (dependencies) => {
    const { use_case: { paymentUsecase } } = dependencies;
    const paymentController = async (req, res) => {
      const { execute } = await paymentUsecase(dependencies);
      try {
        const { amount } = req.body;
        const order = await execute(amount);
        if (!order) return res.status(403).json("Some error occurred in paymentUsecase");
        return res.status(200).json(order);
      } catch (error) {
        return res.status(500).json(error);
      }
    };
    return paymentController;
  };