import crypto from 'crypto';


export const verifypaymentuseCase = (dependencies) => {
  const {config: { RAZORPAY_SECRET_KEY } } = dependencies;


  const execute = async (razorpayPaymentId, razorpayOrderId, razorpaySignature) => {
    try {
      const sign = razorpayOrderId + "|" + razorpayPaymentId;
      const shasum = crypto.createHmac("sha256", RAZORPAY_SECRET_KEY);
      shasum.update(sign.toString());
      const digest = shasum.digest("hex");
      return digest === razorpaySignature;
    } catch (error) {
      console.error("Error in verifypaymentuseCase:", error);
      throw error;
    }
  };
  return { execute };
};