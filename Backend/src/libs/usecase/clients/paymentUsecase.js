import { razorpayInstance } from "../../utils/helpers/razorPayInstance.js";
import crypto from 'crypto';
export const paymentUsecase = () => {
    const execute = async (amount) => {
      try {
        const options = {
          amount: amount * 100, 
          currency: "INR",
          receipt: crypto.randomBytes(10).toString('hex'),
        };
        const order = await razorpayInstance.orders.create(options);
        return order;
      } catch (error) {
        console.error("Error in paymentUsecase:", error);
        throw error;
      }
    };
    return { execute };
  };