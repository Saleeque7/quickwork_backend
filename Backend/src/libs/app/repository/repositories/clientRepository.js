import Schema from "../../database/index.js";
import mongoose from "mongoose";

const { Client, User, JobPost, Proposal, Contract, QbWallet, Admin,JobSubmission } = Schema
export const clientRepository = {
  createClient: async (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      job_role: data.job_role,
      isVerified: true
    }
    const client = await Client.create(userData)
    return client
  },

  findClientByEmail: async (email) => {
    const client = await Client.findOne({ email: email })
    return client
  },
  browseUsers: async (searchQuery, skip, limit) => {
    try {
      const query = { isUserProfile: true };

      if (searchQuery) {
        query.$or = [
          { jobTitle: { $regex: searchQuery, $options: 'i' } },
        ];
      }

      const totalUsersCount = await User.countDocuments(query);


      const users = await User.find(query)
        .sort({ createdAt: -1 })
        .skip(searchQuery ? 0 : skip)
        .limit(limit)
        .exec();

      return {
        total: totalUsersCount,
        users: users,
      };
    } catch (error) {
      console.error("Error in clientrepo: ", error);
      throw new Error('Failed to fetch users');
    }
  },

  createJobrequest: async (data, clientId) => {
    try {
      console.log(data, "data");

      const jobPostData = {
        clientId: clientId,
        projectTerm: data.selectedItem,
        jobRole: data.jobRole,
        budgetType: data.budgetType,
        skills: data.skills,
        description: data.overviewInput,
        Expirydate: data.Expirydate,
        Place: data.Place
      };

      if (data.budgetType === "fixed") {
        jobPostData.budget = data.budget;
      } else if (data.budgetType === "hourly") {
        jobPostData.wageRangeMin = data.wageRangeMin;
        jobPostData.wageRangeMax = data.wageRangeMax;
        jobPostData.selecthour = data.selecthour;
      }
      const jobPost = new JobPost(jobPostData);
      await jobPost.save();


      await Client.findByIdAndUpdate(
        clientId,
        { $push: { jobPosts: jobPost._id } },
        { new: true }
      );

      return jobPost;
    } catch (error) {
      console.error('Error creating job post:', error);
      throw error;
    }
  },
  browseJobapi: async (id) => {
    try {
      const jobdetails = await JobPost.findById(id).exec()
      return jobdetails
    } catch (error) {
      console.error('Error creating job post:', error);
      throw error;
    }
  },
  browseJobPostsapi: async (id, searchQuery,skip,limit) => {
    try {

      const query = { clientId: id };


      if (searchQuery) {
        query.jobRole = { $regex: searchQuery, $options: "i" };
      }

      const total = await JobPost.countDocuments(query)
      const jobDetails = await JobPost.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).exec();
      return {
        jobDetails,
        total
      };
    } catch (error) {
      console.error('Error creating job post:', error);
      throw error;
    }
  },
  browseProposals: async (jobId) => {
    try {
      const proposals = await Proposal.find({ jobId }).sort({ createdAt: -1 })
        .populate('freelancerId', 'name jobTitle skills profile')
        .exec();

      console.log(proposals, "fsdf");

      return proposals;
    } catch (error) {
      console.error('Error browsing job proposals:', error);
      throw error;
    }
  },
  shortList: async (proposalId) => {
    try {
      const proposal = await Proposal.findByIdAndUpdate(proposalId, { status: 'shortList' });

      if (!proposal) {
        throw new Error('Proposal not found');
      }

      return proposal;
    } catch (error) {
      console.error('Error shortlisting proposal:', error);
      throw error;
    }
  },
  unshortList: async (proposalId) => {
    try {
      const proposal = await Proposal.findByIdAndUpdate(proposalId, { status: 'pending' });

      if (!proposal) {
        throw new Error('Proposal not found');
      }

      return proposal;
    } catch (error) {
      console.error('Error unshortlisting proposal:', error);
      throw error;
    }
  },
  archiveList: async (proposalId) => {
    try {
      const proposal = await Proposal.findByIdAndUpdate(proposalId, { status: 'archived' });

      if (!proposal) {
        throw new Error('Proposal not found');
      }

      return proposal;
    } catch (error) {
      console.error('Error archiveList proposal:', error);
      throw error;
    }
  },
  unarchiveList: async (proposalId) => {
    try {
      const proposal = await Proposal.findByIdAndUpdate(proposalId, { status: 'pending' });

      if (!proposal) {
        throw new Error('Proposal not found');
      }

      return proposal;
    } catch (error) {
      console.error('Error archiveList proposal:', error);
      throw error;
    }
  },
  declineProposal: async (proposalId) => {
    try {
      const proposal = await Proposal.findByIdAndUpdate(proposalId, { status: 'rejected' }, { new: true });

      if (!proposal) {
        throw new Error('Proposal not found');
      }
      await JobPost.findByIdAndUpdate(proposal.jobId, { $pull: { proposals: proposalId } });
      return proposal;
    } catch (error) {
      console.error('Error declining proposal:', error);
      throw error;
    }
  },
  getProposalWithUserInfo: async (id) => {
    try {
      const proposal = await Proposal.findById(id).populate('freelancerId');

      if (!proposal) {
        throw new Error('Proposal not found');
      }
      return proposal
    } catch (error) {
      console.error('Error in  userproposal:', error);
      throw error;
    }
  },
  createContract: async (data) => {
    try {
      console.log(data, "wtttt");
      const {
        userId, client, proposalId, jobId, budgetType, contractAmount, contractTitle, paymentOption, contractDueDate, milestones, projectFile, projectStartDate, hoursOfWork,
      } = data
      const proposal = await Proposal.findById(proposalId);


      if (!proposal) {
        throw new Error(`Proposal with ID ${proposalId} not found`);
      }


      proposal.status = 'accepted';
      await proposal.save();


      const updateUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { applications: proposalId } },
        { new: true }
    );

      const updateJobPost = await JobPost.updateMany(
        { proposals: proposalId },
        { $pull: { proposals: proposalId } },
        { new: true }
      );


      const contractData = {
        userSide: {
          userId,
        },
        clientSide: {
          clientId: client,
        },
        proposalId,
        jobId,
        budgetType,
        contractTitle,
        contractAmount,
        paymentOption,
        projectFile,
        workDuration: hoursOfWork
      };


      if (budgetType === 'fixed') {
        if (paymentOption === 'fullPay') {
          contractData.contractDueDate = contractDueDate;
        } else if (paymentOption === 'milestones') {
          contractData.milestones = milestones;
        }
      } else if (budgetType === 'hourly') {
        contractData.projectStartDate = projectStartDate;
      }
      const newContract = new Contract(contractData);
      await newContract.save();

      return newContract

    } catch (error) {
      console.error('Error in  createContract:', error);
      throw error;
    }
  },
  saveAddress: async (data, clientId) => {
    try {
      const { address, city, state, postal } = data;
  
      console.log('Updating client with ID:', clientId);
      console.log('New address data:', { address, city, state, postal });
  
      const updatedClient = await Client.findByIdAndUpdate(
        clientId,
        {
          Address: {
            address,
            city,
            state,
            postalCode: postal,
          },
        },
        { new: true }
      );
  
      if (!updatedClient) {
        console.error('Client not found with ID:', clientId);
        throw new Error('Client not found');
      }
  
      console.log('Updated client:', updatedClient);
      console.log('Updated address:', updatedClient.Address);
  
      return updatedClient;
    } catch (error) {
      console.error('Error in saveAddress:', error);
      throw error;
    }
  },
  
  browseContractapi: async (clientId, searchQuery) => {
    try {

      const query = { 'clientSide.clientId': clientId };

      if (searchQuery) {
        query.$or = [
          { 'contractTitle': { $regex: searchQuery, $options: 'i' } }
        ];
      }
      const contractDetails = await Contract.find(query)
        .sort({ createdAt: -1 })
        .populate('jobId')
        .exec();

      return contractDetails;
    } catch (error) {
      console.error('Error fetching job posts:', error);
      throw error;
    }
  },
  paymentafterEdit: async (id, data) => {
    try {
      const contract = await Contract.findById(id).populate('userSide.userId clientSide.clientId jobId proposalId');
      if (!contract) {
        throw new Error('Contract not found');
      }

      contract.QwPayment = true;
      contract.QwId = data
      await contract.save();


      const notification = {
        proposalId: contract.proposalId,
        clientId: contract.clientSide.clientId,
        jobId: contract.jobId,
        contractId: id,
        message:`your proposal towards ${contract.jobId.jobRole} accepted. if you like to continue with the job please accept the job offer`
      };

      const user = await User.findById(contract.userSide.userId);
      if (!user) {
        throw new Error('User not found');
      }
      user.notifications.push(notification);
      await user.save();

      return contract;
    } catch (error) {
      console.error('Error paymentafterEdit:', error);
      throw error;
    }
  },
  getContracinfo: async (id) => {
    try {
      const contract = await Contract.findById(id).populate('userSide.userId jobId proposalId');
      if (!contract) {
        throw new Error('User not found');
      }
      return contract
    } catch (error) {
      console.error('Error getContracinfo:', error);
      throw error;
    }
  },
  getuserInfo: async (id) => {
    try {

      const client = await User.findOne({ _id: id.id });
      return client;
    } catch (error) {
      console.error('Error fetching user information:', error);
      throw error;
    }
  },
  paymentToWallet: async (data, clientId) => {
    try {

      const {paymentId, contractAmount, initiationfee, contractId } = data;
      const roundedcontractAmount = Math.round(contractAmount);
      const roundedinitiationfee = Math.round(initiationfee);

      if (typeof contractAmount !== 'number' || isNaN(roundedcontractAmount)) {
        throw new Error(`Invalid contractAmount: ${roundedcontractAmount}`);
      }
      if (typeof initiationfee !== 'number' || isNaN(roundedinitiationfee)) {
        throw new Error(`Invalid initiationfee: ${roundedinitiationfee}`);
      }

      let qbWallet = await QbWallet.findOne();
      if (!qbWallet) {
        qbWallet = new QbWallet();
        await qbWallet.save();
      }

      const bidAmount = roundedcontractAmount - roundedinitiationfee

      qbWallet.balance = (qbWallet.balance || 0) + bidAmount;
      qbWallet.transactions.push({
        amount: bidAmount,
        source: 'Payment received',
        contractId: contractId,
        ClientId: clientId,
        status: 'credit',
      });

      await qbWallet.save();
      const paymentMethod = paymentId.startsWith('STR_') ? 'Stripe' : 'RazorPay';
      const transactionData = {
        Transaction_id:paymentId,
        amount:bidAmount,
        source:'Contract Payment',
        contractId:contractId,
        payment_method:paymentMethod
      }

      const client = await Client.findById(clientId);
      if (!client) {
        throw new Error('Client not found');
      }

      client.transactionSchema.push(transactionData);
      await client.save();

      let admin = await Admin.findOne();
      if (!admin) throw new Error('Admin not found');


      if (!admin.wallet) {
        admin.wallet = { balance: 0, transactions: [] };
      }


      if (isNaN(admin.wallet.balance)) {
        admin.wallet.balance = 0;
      }
      if (isNaN(roundedinitiationfee)) {
        throw new Error(`Invalid initiationfee: ${roundedinitiationfee}`);
      }

      admin.wallet.balance += roundedinitiationfee;
      admin.wallet.transactions.push({
        amount: roundedinitiationfee,
        source: 'Payment received',
        contractId: contractId,
        status: 'credit',
      });

      await admin.save();

      const newTransaction = client.transactionSchema[client.transactionSchema.length - 1];
    const newTransactionId = newTransaction._id;
      
      return{ 
        walletId:qbWallet._id,
        transaction:newTransactionId
      }

    } catch (error) {
      console.error('Error in  paymentToWallet', error);
      throw error;
    }
  },
  submittedContract: async (clientId, search) => {
    try {
  
      if (!mongoose.Types.ObjectId.isValid(clientId)) {
        throw new Error('Invalid clientId format');
      }
  
      const submissions = await JobSubmission.find({ clientId })
      .populate('jobId')
      .populate('contractId')
      .populate('userId')
      .exec();

    return submissions;
    } catch (error) {
      console.error('Error fetching job submissions:', error);
      throw new Error('Unable to fetch job submissions');
    }
  },
  
  deleteJobpost: async (jobId) => {
    try {
      
      const updatedJob = await JobPost.findByIdAndUpdate(
        jobId,
        { status: "Expired" },
        { new: true }
      );

      if (!updatedJob) {
        throw new Error("Job post not found");
      }


      await Proposal.updateMany(
        { jobId: jobId, status: { $ne: 'accepted' } },
        { status: 'archived' }
      );

      await updatedJob.save();

      return updatedJob;
    } catch (error) {
      console.error("Error updating job post status:", error);
      throw error;
    }
  },
  editJobrequest: async (data, clientId, jobId , action) => {
    try {

      const job = await JobPost.findById(jobId);
      if (!job) {
        throw new Error('Job post not found');
      }

      job.clientId = clientId;
      job.projectTerm = data.projectTerm;
      job.jobRole = data.jobRole;
      job.skills = data.skills;
      job.description = data.description;
      job.Expirydate = data.Expirydate;
      job.Place = data.Place;
     


      if (job.budgetType === data.budgetType) {

        if (job.budgetType === "fixed") {

          if (job.budget !== data.budget) {
            job.budget = data.budget;
          }
        } else if (job.budgetType === "hourly") {

          if (
            job.wageRangeMin !== data.wageRangeMin ||
            job.wageRangeMax !== data.wageRangeMax ||
            job.selecthour !== data.selecthour
          ) {
            job.wageRangeMin = data.wageRangeMin;
            job.wageRangeMax = data.wageRangeMax;
            job.selecthour = data.selecthour;
          }
        }
      } else {

        if (data.budgetType === "fixed") {

          job.budgetType = "fixed";
          job.budget = data.budget;
          job.wageRangeMin = undefined;
          job.wageRangeMax = undefined;
          job.selecthour = undefined;
        } else if (data.budgetType === "hourly") {

          job.budgetType = "hourly";
          job.wageRangeMin = data.wageRangeMin;
          job.wageRangeMax = data.wageRangeMax;
          job.selecthour = data.selecthour;
          job.budget = undefined;
        }
      }

      if(action === 'Repost'){
        job.status ='pending'
      }

      await job.save();

      return job;
    } catch (error) {
      console.error('Error editing job post:', error);
      throw error;
    }
  },
   findProfile : async (userId) => {
    try {
      const userData = await User.findById(userId);
      console.log(userData, "Fetched user data");
      return userData;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },
  findTransaction : async(transactionId, clientId) => {
    try {
      console.log("Searching for transaction with ID:", transactionId);
      console.log("Under client with ID:", clientId);
      
      const client = await Client.findOne(
          {"transactionSchema._id": transactionId },
          { "transactionSchema.$": 1 }
      );

      if (!client) {
          console.log('No matching client or transaction found');
          throw new Error('Transaction not found');
      }

      return client.transactionSchema[0];
  } catch (error) {
      console.error('Error in findTransaction:', error.message);
      throw error;
  }
},
alltransactions:async(clientId, searchQuery, skip, limit)=>{
  try {
    const clientInfo = await Client.findById(clientId).select('transactionSchema');
    if (!clientInfo) {
      throw new Error('Client not found');
    }

    let transactions = clientInfo.transactionSchema;


    if (searchQuery) {
      transactions = transactions.filter((transaction) =>
        Object.values(transaction).some(value =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }


    const totalCount = transactions.length;


    transactions = transactions.reverse();


    const paginatedTransactions = transactions.slice(skip, skip + limit);

   
    return {
      transactions: paginatedTransactions,
      totalCount: totalCount
    };
  } catch (error) {
    console.error('Error in alltransactions:', error.message);
    throw error;
  }
},
wallettransactions:async(clientId, searchQuery, skip, limit)=>{
  try {
    console.log(clientId,"clientId");
    const client = await Client.findById(clientId)
      .select('wallet.Wallettransactions wallet.balance')
      .exec();


    if (!client || !client.wallet) {
      throw new Error('Client or wallet not found');
    }
    const balance = client.wallet.balance;
 
    let filteredTransactions = client.wallet.Wallettransactions.filter(transaction => {
      let matches = true;
      if (searchQuery.source) {
        matches = matches && transaction.source === searchQuery.source;
      }
      if (searchQuery.status) {
        matches = matches && transaction.status === searchQuery.status;
      }
      return matches;
    });

   
    console.log(balance,"dsds");
    
   
    const paginatedTransactions = filteredTransactions.slice(skip, skip + limit);

    return {
      transactions: paginatedTransactions,
      totalCount: filteredTransactions.length,
      balance:balance
    };
  } catch (error) {

    console.error('Error fetching wallet transactions:', error);
    throw new Error('An error occurred while fetching wallet transactions.');
  }
},
browseSubmitted: async (id) => {
  try {
    const result = await JobSubmission.findById(id)
    .populate('clientId')  
    .populate('contractId') 
    .populate('userId')
    .populate('jobId')
    return result;
  } catch (error) {
    console.error("Error in browseSubmitted:", error);
    throw new Error("Error in repository while fetching submitted job");
  }
},
 acceptJobSubmit : async (data, clientId) => {
  const session = await mongoose.startSession(); 
  session.startTransaction();

  try {
    const { contractId, jobId, userId, jobsubmission } = data;

    // Update contract
    const contract = await Contract.findById(contractId).session(session);
    if (!contract) throw new Error('Contract not found');
    contract.contractStatus = 'completed';
    contract.clientSide.status = 'completed';
    await contract.save();

    // Update job submission
    const jobSub = await JobSubmission.findById(jobsubmission).session(session);
    if (!jobSub) throw new Error('Job submission not found');
    jobSub.status = 'accept';
    await jobSub.save();

    // Update QbWallet
    const qbWallet = await QbWallet.findById(contract.QwId).session(session);
    if (!qbWallet) throw new Error('QbWallet not found');
    const transaction = qbWallet.transactions.find(
      (txn) => txn.contractId.toString() === contractId
    );
    if (!transaction) throw new Error('Transaction not found in QbWallet');

    qbWallet.balance -= transaction.amount;
    qbWallet.transactions.push({
      amount: transaction.amount,
      source: 'contract Payment',
      contractId: contractId,
      status: 'debit',
    });
    const adminWallet = Math.floor(transaction.amount * 0.1);
    await qbWallet.save();

    // Update User Wallet
    const user = await User.findById(userId).session(session);
    if (!user) throw new Error('User not found');
    if (!user.wallet) {
      user.wallet = { balance: 0, Wallettransactions: [] };
    }
    user.wallet.balance += transaction.amount;
    user.wallet.Wallettransactions.push({
      amount: transaction.amount,
      source: 'Contract Payment',
      contractId: contractId,
      status: 'credit',
    });
    user.totalEarnings += transaction.amount;
    await user.save();

    // Update Admin Wallet
    const admin = await Admin.findOne().session(session);
    if (!admin) throw new Error('Admin not found');
    if (!admin.wallet) {
      admin.wallet = { balance: 0, transactions: [] };
    }
    if (isNaN(admin.wallet.balance)) {
      admin.wallet.balance = 0;
    }
    admin.wallet.balance += adminWallet;
    admin.wallet.transactions.push({
      amount: adminWallet,
      source: 'convenience fee',
      contractId: contractId,
      status: 'credit',
    });
    await admin.save();

    // Update Job Post
    const jobPost = await JobPost.findById(jobId).session(session);
    if (!jobPost) throw new Error('Job post not found');
    await JobPost.updateOne(
      { _id: jobId },
      {
        $set: {
          status: 'completed',
          proposals: []
        }
      }
    );

    await session.commitTransaction();
    session.endSession();

    return {
      userId:user._id,
      jobId
    }
  } catch (error) {
    console.error(error, 'Error in acceptJobSubmit');
    await session.abortTransaction(); 
    session.endSession();
  }
},
rating: async (data,client) => {
  try {
      const {rating , comment , jobId , userId } = data

      const job  = await JobPost.findById(jobId)
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('user not found');
      }
      const ratingData = {
          rating,
          comment,
          jobId,
          reviewer: client,
          contractTitle: job.jobRole,
      }

      user.ratings.push(ratingData);
      await user.save();
   return user
  } catch (error) {
      console.error(error);
      throw error;
  }
}

  

}