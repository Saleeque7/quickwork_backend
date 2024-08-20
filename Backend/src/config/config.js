import dotenv from 'dotenv'
dotenv.config()

export default {
    MONGODB_URI: process.env.MONGODB_URI,
    PORT: process.env.PORT,
    GIT_HUB_CLIENT_ID: process.env.GIT_HUB_CLIENT_ID,
    GIT_HUB_CLIENT_SECRET: process.env.GIT_HUB_CLIENT_SECRET,
    GIT_HUB_CLIENT_ID_LOG: process.env.GIT_HUB_CLIENT_ID_LOG,
    GIT_HUB_CLIENT_SECRET_LOG: process.env.GIT_HUB_CLIENT_SECRET_LOG,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
    S3_BUCKET_ACCESS_KEY:process.env.S3_BUCKET_ACCESS_KEY,
    S3_BUCKET_SECRET_ACCESS_KEY:process.env.S3_BUCKET_SECRET_ACCESS_KEY,
    S3_BUCKET_REGION:process.env.S3_BUCKET_REGION,
    S3_BUCKET_NAME:process.env.S3_BUCKET_NAME,
    RAZORPAY_ID_KEY:process.env.RAZORPAY_ID_KEY,
    RAZORPAY_SECRET_KEY:process.env.RAZORPAY_SECRET_KEY,
    STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY,
    BASE_URL:process.env.BASE_URL
}



// export default {
    // GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    // GOOGLE_SEARCH_ID: process.env.GOOGLE_SEARCH_ID,
    // OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    // OPENAI_PROJECT_ID:process.env.OPENAI_PROJECT_ID,
    // OPENAI_ORG_ID:process.env.OPENAI_ORG_ID,
//     MONGODB_URI: process.env.MONGODB_URI,
//     PORT: process.env.PORT,
//     CLIENT_ID: process.env.CLIENT_ID,
//     CLIENT_SECRET: process.env.CLIENT_SECRET,

// };
