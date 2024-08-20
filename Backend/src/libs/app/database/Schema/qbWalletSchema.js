import mongoose from 'mongoose';

// Transaction Schema
const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
    },
    source: {
        type: String,
       
        enum: [
            'Payment received',
            'Issue Refund',      
          ], 
      },
    contractId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract',  
     
    },
    ClientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',    
    },
    status: {
      type: String,
      enum: ['credit','debit'],
      default: 'credit',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);


const qbWalletSchema = new mongoose.Schema(
  {
    balance: {
      type: Number,
      default: 0,
    },
    transactions: [transactionSchema],
  },
  {
    timestamps: true,
  }
);

const QbWallet = mongoose.model('QbWallet', qbWalletSchema);

export { QbWallet };
