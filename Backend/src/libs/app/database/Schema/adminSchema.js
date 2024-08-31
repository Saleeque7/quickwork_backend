import mongoose from 'mongoose';


const transactionSchema = mongoose.Schema({
    amount: {
        type: Number,
    },
    source: {
        type: String,     
        enum: [
          'Payment received',
          'Withdrawal',
          'Transfer from another wallet',
          'convenience fee'
          
        ],
      },
    contractId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract', 
        
    },
    status: {
        type: String,
        enum: ['credit', 'debit'],
        default: 'credit',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const walletSchema = new mongoose.Schema(
    {
      balance: {
        type: Number,
        default: 0,
      },
      transactions: [transactionSchema],
    },
    {
      _id: false,
    },
    {
      timestamps: true,
    }
  );


const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profile: {
        type: String
    },
    refreshToken: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    wallet: walletSchema  
});

adminSchema.index({ email: 1 });

const Admin = mongoose.model('Admin', adminSchema);

export { Admin };
