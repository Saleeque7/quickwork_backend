import config from "../../../config/config.js";
import Razorpay from 'razorpay'


export const razorpayInstance = new Razorpay({
    key_id: config.RAZORPAY_ID_KEY,
    key_secret: config.RAZORPAY_SECRET_KEY
});