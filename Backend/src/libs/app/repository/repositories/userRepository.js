import Schema from '../../database/index.js'

const { User, JobPost, Client, Proposal, Contract, JobSubmission, QbWallet } = Schema
const repository = {
    createUser: async (data) => {

        const userData = {
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
            job_role: data.job_role,
            isVerified: true
        }

        const user = await User.create(userData)
        return user
    },
    findUserByEmail: async (email) => {
        const user = await User.findOne({ email: email })
        return user
    },
    findUSerByIdAndUpdate: async (userId, userInfo) => {
        try {

            const user = await User.findById(userId)
            if (!user) {
                throw new Error("user not Found")
            }
            user.name = userInfo.name
            user.email = userInfo.email
            user.phone = userInfo.phone
            user.dateOfBirth = userInfo.dateOfBirth
            user.state = userInfo.place
            user.profile = userInfo.image

            const updatedUser = await user.save();
            console.log(updatedUser, "ghjhghh");
            return updatedUser
        } catch (error) {
            console.error("error in userRepository :", error);
        }
    },
    findUserAndaddInfo: async (data, userId) => {
        try {
            const user = await User.findById(userId)
            if (!user) {
                throw new Error("user not Found")
            }
            user.jobTitle = data.jobTitle
            user.overview = data.Overview
            user.skills = data.skills
            user.hourlyRate = data.rate

            const updateddata = await user.save();
            return updateddata
        } catch (error) {
            console.error("error in userRepository :", error);

        }

    },
    saveExperienceInfo: async (userId, data) => {
        try {
            const user = await User.findById(userId)
            if (!user) {
                throw new Error("user not Found")
            }

            if (data && user) {
                user.experiences.push({
                    jobTitle: data.jobTitleExp,
                    company: data.companyExp,
                    duration: data.duration,
                    overview: data.expOverview,
                });
            }
            user.isUserProfile = true
            const updateddata = await user.save();
            return updateddata
        } catch (error) {
            console.error("error in userRepository :", error);

        }

    },
    changeisUserprofile: async (userId) => {
        const user = await User.findById(userId)
        user.isUserProfile = true
        const updateddata = await user.save();
        return updateddata
    },
    getjobcards: async (skip, limit) => {
        try {
            const statusFilter = { status: "pending" };
            const total = await JobPost.countDocuments(statusFilter);
            const jobCards = await JobPost.find(statusFilter).sort({ createdAt: -1 }).skip(skip).limit(limit)
            return { jobCards, total };
        } catch (error) {
            console.error("error in userRepository :", error);

        }
    },
    getSavedJobs: async (userId, skip, limit) => {
        try {
            const user = await User.findById(userId)
                .populate({
                    path: 'savedJobs.job',
                    model: 'JobPost'
                });

            if (!user) {
                throw new Error('User not found');
            }


            user.savedJobs.sort((a, b) => b.createdAt - a.createdAt);


            const totalSavedJobs = user.savedJobs.length;


            const paginatedSavedJobs = user.savedJobs.slice(skip, skip + limit);

            return { savedJobs: paginatedSavedJobs, totalSavedJobs };

        } catch (error) {
            console.error('Error in userRepository:', error);
            throw error;
        }
    },
    getMatchingjobcards: async (userId, skip, limit) => {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }
            const userSkillsRegex = user.skills.map(skill => new RegExp(`^${skill}$`, 'i'));

            const total = await JobPost.countDocuments({
                skills: { $in: userSkillsRegex },
                status: 'pending'
            });

            const matchedJobs = await JobPost.find({
                skills: { $in: userSkillsRegex },
                status: 'pending'
            }).skip(skip).limit(limit);

            return { matchedJobs, total };
        } catch (error) {
            console.error("error in userRepository :", error);

        }
    },
    browseJobpost: async (id, userId) => {
        try {
            const job = await JobPost.findById(id)
            const user = await User.findById(userId)
            const client = await Client.findById(job.clientId).populate('jobPosts');
            const jobPostCount = client.jobPosts.length;
            const hourlyRate = user.hourlyRate;
            return {
                job,
                jobPostCount,
                hourlyRate
            }
        } catch (error) {
            console.error("error in userRepository :", error);
        }
    },
    applyJob: async (data, user) => {
        try {
            const jobId = data.jobId
            const proposal = new Proposal({
                jobId: jobId,
                freelancerId: user,
                coverLetter: data.coverLetter,
                bidAmount: data.bidAmount,
                duration: data.duration,
            });
            await proposal.save();

            const userInfo = await User.findByIdAndUpdate(user, {
                $push: {
                    applications: {
                        proposalId: proposal._id,
                        jobId: jobId,
                    }
                }
            });




            await JobPost.findByIdAndUpdate(jobId, { $push: { proposals: proposal._id } });
            const updatedJobPost = await JobPost.findById(jobId).exec();
            updatedJobPost.proposalCount = updatedJobPost.proposals.length;
            await updatedJobPost.save();

            return userInfo
        } catch (error) {
            console.error(error, "error in repo");
        }
    },
    browseNotifications: async (id) => {
        try {
            console.log(id, "id");
            const user = await User.findById(id)
                .select('notifications')
                .populate({
                    path: 'notifications.jobId',
                    model: 'JobPost'
                })
                .populate({
                    path: 'notifications.clientId',
                    model: 'Client'
                })
                .populate({
                    path: 'notifications.proposalId',
                    model: 'Proposal'
                })
                .populate({
                    path: 'notifications.contractId',
                    model: 'Contract'
                });

            console.log(user, "user");

            if (!user) {
                throw new Error('User not found');
            }

            return user.notifications;
        } catch (error) {
            console.error(error, "error in repo");

        }
    },
    markasRead: async (id, userId) => {
        try {
            const user = await User.findOneAndUpdate(
                { _id: userId, 'notifications._id': id },
                { $set: { 'notifications.$.status': 'read' } },
                { new: true }
            );

            if (!user) {
                throw new Error('User or notification not found');
            }

            return user;
        } catch (error) {
            console.error(error, "error in repo");
        }
    },
    getuserContracinfo: async (id) => {
        try {
            const contract = await Contract.findById(id).populate('clientSide.clientId jobId proposalId');
            if (!contract) {
                throw new Error('contract not found');
            }
            return contract
        } catch (error) {
            console.error('Error getuserContracinfo:', error);
            throw error;
        }
    },
    Contractaction: async (id, action) => {
        try {
            const update = action === 'accepted'
                ? { 'userSide.status': 'accepted' }
                : { 'userSide.status': 'rejected' };

            const contract = await Contract.findByIdAndUpdate(id, update, { new: true });

            if (!contract) {
                throw new Error('Contract not found');
            }

            return contract;
        } catch (error) {
            console.error('Error getuserContracinfo:', error);
            throw error;
        }
    },
    acceptedContracts: async (id, searchQuery, skip, limit) => {
        try {
            const query = {
                'userSide.userId': id,
                'userSide.status': { $in: ['accepted', 'submitted'] },
                $or: [
                    { 'jobId.jobRole': { $regex: searchQuery, $options: 'i' } },
                    { 'contractTitle': { $regex: searchQuery, $options: 'i' } }
                ]
            };


            const contracts = await Contract.find(query)
                .populate('jobId proposalId clientSide.clientId')
                .sort({ createdAt: -1 })
                .skip(searchQuery ? 0 : skip)
                .limit(limit);


            const count = await Contract.countDocuments(query);

            return {
                contracts,
                count
            };
        } catch (error) {
            console.error('Error in acceptedContracts:', error);
            throw error;
        }
    },
    saveJobDetails: async (data) => {
        try {
            const { jobId, contractId, userId, clientId, completionDate, overview, projectFile } = data;

            const contract = await Contract.findById(contractId).exec();

            if (contract) {
                contract.userSide.status = 'submitted';
                await contract.save();
            }

            const newSubmission = new JobSubmission({
                jobId,
                contractId,
                userId,
                clientId,
                completionDate,
                overview,
                projectFile
            });

            await newSubmission.save();
            return newSubmission
        } catch (error) {
            console.error('Error saveJobDetails:', error);
            throw error;
        }
    },
    findWorks: async (searchQuery, skip, limit) => {
        try {

            const filter = {
                status: 'pending',
                ...(searchQuery && { jobRole: { $regex: searchQuery, $options: 'i' } })
            };


            const jobPosts = await JobPost.find(filter)
                .sort({ createdAt: -1 })
                .skip(searchQuery ? 0 : skip)
                .limit(limit);


            const count = await JobPost.countDocuments(filter);

            return {
                jobPosts,
                count
            };
        } catch (error) {
            console.error('Error findWorks:', error);
            throw error;
        }
    },

    getclientInfo: async (id) => {
        try {

            const client = await Client.findOne({ _id: id.id });
            return client;
        } catch (error) {
            console.error('Error fetching client information:', error);
            throw error;
        }
    },
    alljobproposals: async (user, searchQuery, skip, limit) => {
        try {

            const totalProposals = await Proposal.find({ freelancerId: user })
                .populate('jobId')
                .countDocuments()
                .exec();


            const proposals = await Proposal.find({ freelancerId: user })
                .populate('jobId')
                .sort({ createdAt: -1 })
                .skip(searchQuery ? 0 : skip)
                .limit(limit)
                .exec();


            const filteredProposals = proposals.filter(proposal => {
                const jobRole = proposal.jobId?.jobRole || '';
                const regex = new RegExp(searchQuery, 'i');
                return regex.test(jobRole);
            });

            return {
                proposals: filteredProposals,
                count: totalProposals
            };
        } catch (error) {
            console.error(error, "error in repo");
        }
    },
    viewproposal: async (proposalId) => {
        try {
            const proposals = await Proposal.find({ _id: proposalId })
                .populate('jobId')
                .populate('freelancerId')
                .exec();
            return proposals
        } catch (error) {
            console.error(error, "erro in repo");
        }
    },
    findUserById: async (userId) => {
        try {
            const user = await User.findOne({ _id: userId });
            return user;
        } catch (error) {
            console.error("Error finding user by ID:", error);
            throw error;
        }
    },
    edituserInfoById: async (userId, data) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $set: data },
                { new: true }
            );
            if (!updatedUser) {
                throw new Error("Editing user not successful");
            }
            return updatedUser;
        } catch (error) {
            console.error("Error editing user by ID:", error);
            throw error;
        }
    },
    saveJob: async (job, userId) => {
        try {
            const user = await User.findById(userId)
            if (!user) {
                throw new Error("user not Found")
            }

            if (job && user) {
                user.savedJobs.push({
                    job: job
                });
            }
            const userData = await user.save();
            return userData

        } catch (error) {
            console.error("errro in savejob repo");
            throw error
        }
    },
    unsaveJob: async (jobId, userId) => {
        try {
            const user = await User.findById(userId)
            if (!user) {
                throw new Error("user not Found")
            }
            if (jobId && user) {
                user.savedJobs = user.savedJobs.filter(job => job.job.toString() !== jobId.toString());
            }
            const userData = await user.save();
            return userData

        } catch (error) {
            console.error("errro in savejob repo");
            throw error
        }
    },
    disLikeJob: async (jobId, userId) => {
        try {
            const user = await User.findById(userId)
            if (!user) {
                throw new Error("user not Found")
            }

            if (jobId && user) {
                user.notInterestedJobs.push({
                    job: jobId
                });
            }
            const userData = await user.save();
            return userData

        } catch (error) {
            console.error("errro in dislike repo");
            throw error
        }
    },
    LikeJob: async (jobId, userId) => {
        try {
            const user = await User.findById(userId)
            if (!user) {
                throw new Error("user not Found")
            }
            if (jobId && user) {
                user.notInterestedJobs = user.notInterestedJobs.filter(job => job.job.toString() !== jobId.toString());
            }
            const userData = await user.save();
            return userData

        } catch (error) {
            console.error("errro in savejob repo");
            throw error
        }
    },
    editProposal: async (data, proposalId) => {
        try {
            const { coverLetter, bidAmount, duration } = data;

            const updatedProposal = await Proposal.findByIdAndUpdate(
                proposalId,
                { coverLetter, bidAmount, duration },
                { new: true }
            );

            return updatedProposal
        } catch (error) {
            console.error("errro in savejob repo");
            throw error
        }
    },
    deleteProposal: async (proposalId, userId) => {
        try {
            const deleteResult = await Proposal.findByIdAndDelete(proposalId)
            if (!deleteResult) {
                throw new Error('Proposal not found');
            }

            const updateUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { applications: proposalId } },
                { new: true }
            );

            if (!updateUser) {
                throw new Error('User not found');
            }

            const updateJobPost = await JobPost.updateMany(
                { proposals: proposalId },
                { $pull: { proposals: proposalId } }
            );

            return deleteResult
        } catch (error) {
            console.error(error, "error in repo");

        }
    },
    editImage: async (userId, image) => {
        try {

            const user = await User.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }
            user.profile = image;
            const updatedUser = await user.save();
            return updatedUser;
        } catch (error) {
            console.error("error in repo");

        }
    },
    quitContract: async (contractId, reason) => {
        try {
            const contract = await Contract.findByIdAndUpdate(
                contractId,
                { contractStatus: 'dismissed', dismissalReason: reason },
                { new: true }
            );

            if (!contract) {
                throw new Error('Contract not found');
            }

            const qbWallet = await QbWallet.findById(contract.QwId);
            if (!qbWallet) {
                throw new Error('QbWallet not found');
            }

            const transaction = qbWallet.transactions.find(
                (txn) => txn.contractId.toString() === contractId
            );
            if (!transaction) {
                throw new Error('Transaction not found in QbWallet');
            }

            qbWallet.balance -= transaction.amount;
            qbWallet.transactions.push({
                amount: transaction.amount,
                source: 'Issue Refund',
                contractId: contractId,
                status: 'debit',
            });
            await qbWallet.save();

            const client = await Client.findById(contract.clientSide.clientId);
            if (!client) {
                throw new Error('Client not found');
            }

            if (!client.wallet) {
                client.wallet = {
                    balance: 0,
                    Wallettransactions: [],
                };
            }

            client.wallet.balance += transaction.amount;
            client.wallet.Wallettransactions.push({
                amount: transaction.amount,
                source: 'Refund received',
                contractId: contractId,
                status: 'credit',
            });
            await client.save();

            return contract;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    rating: async (data,user) => {
        try {
            const {rating , comment , jobId } = data

            const job  = await JobPost.findById(jobId)
            const client = await Client.findById(job.clientId);
            if (!client) {
              throw new Error('Client not found');
            }
            const ratingData = {
                rating,
                comment,
                jobId,
                reviewer: user,
                contractTitle: job.jobRole,
            }

            client.ratings.push(ratingData);
            await client.save();
            return client
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

export default repository