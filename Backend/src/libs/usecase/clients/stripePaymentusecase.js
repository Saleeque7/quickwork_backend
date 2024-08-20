import stripe from "../../utils/Stripe/stripe.js";
// const crypto = require('crypto');

import crypto from 'crypto'

export const stripePaymentusecase = (dependencies) => {
  const { config: { BASE_URL } } = dependencies;
  const { repositories: { clientRepository: { paymentafterEdit, paymentToWallet } } } = dependencies;


  const execute = async (amount, customerDetails, walletData, clientId) => {
    try {
      const paymentId = 'STR_' + crypto.randomBytes(10).toString('hex');
      const { amountInINR, contractId, initiationfee } = walletData
      const data = { paymentId, contractAmount: amountInINR, initiationfee, contractId }
      const { walletId, transaction } = await paymentToWallet(data, clientId)

      if (!amount || amount <= 0) {
        throw new Error("Invalid payment amount");
      }

      const customer = await stripe.customers.create({
        name: customerDetails.name,
        address: {
          line1: customerDetails.address.address,
          city: customerDetails.address.city,
          state: customerDetails.address.state,
          postal_code: customerDetails.address.postal,
        }
      });

      const lineItems = [{
        price_data: {
          currency: "USD",
          product_data: {
            name: "Contract Payment",
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      }];

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${BASE_URL}/client/success/${transaction}`,
        cancel_url: `${BASE_URL}/client/cancel`,
        customer: customer.id,
      });


      if (walletId) {
        await paymentafterEdit(contractId , walletId)
      }

      return session;
    } catch (error) {
      console.error("Error in stripePaymentusecase:", error);
      throw error;
    }
  };

  return { execute };
};
