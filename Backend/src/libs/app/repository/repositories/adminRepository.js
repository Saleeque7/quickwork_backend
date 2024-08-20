import Schema from "../../database/index.js";
import { hashuserPassword } from "../../../utils/helpers/hashPassword.js";

const { User, Client, Admin } = Schema;

export const adminRepository = {
    findAdminByEmail: async (email) => {
        try {
            const admin = await Admin.findOne({ email });
            return admin;
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw new Error('Error finding user by email');
        }
    },



    createAdmin: async (data) => {
        const { name, email, password, phone, isVerified, isAdmin } = data;

        try {
            const hashedPassword = await hashuserPassword(password);
            const adminData = {
                name,
                email,
                password: hashedPassword,
                phone,
                isVerified,
                isAdmin
            };

            const admin = await Admin.create(adminData);
            return admin;
        } catch (error) {
            console.error('Error creating admin:', error);
            throw new Error('Error creating admin');
        }
    },
    findUsers: async () => {
        try {
            const users = await User.find().sort({ createdAt: -1 });
            if (!users) {
                throw new Error("users can't find")
            }

            return users

        } catch (error) {
            console.error(error, ":error fetching users")
        }
    },
    findClients: async () => {
        try {
            const clients = await Client.find().sort({ createdAt: -1 });
            if (!clients) {
                throw new Error("users can't find")
            }

            return clients

        } catch (error) {
            console.error(error, ":error fetching users")
        }
    },

    findUserByIdAndUpdate: async (userId, action) => {
        try {
            let user;

            if (action === "block") {
                user = await User.findByIdAndUpdate(
                    userId,
                    { isBlock: true },
                    { new: true }
                );
            } else if (action === "unblock") {
                user = await User.findByIdAndUpdate(
                    userId,
                    { isBlock: false },
                    { new: true }
                );
            }

            if (!user) {
                console.error(`UserID ${userId} not found.`);
                return null;
            }

            return user;
        } catch (error) {
            console.error(`${error.message}: error updating user by Id`);
            throw error;
        }
    },
    findclientByIdAndUpdate: async (clienId, action) => {
        try {
            let client;

            if (action === "block") {
                client = await Client.findByIdAndUpdate(
                    clienId,
                    { isBlock: true },
                    { new: true }
                );
            } else if (action === "unblock") {
                client = await Client.findByIdAndUpdate(
                    clienId,
                    { isBlock: false },
                    { new: true }
                );
            }

            if (!client) {
                console.error(`client not found.`);
                return null;
            }

            return client;
        } catch (error) {
            console.error(`${error.message}: error updating user by Id`);
            throw error;
        }
    },
    browseData:async(adminId)=>{
        try {
            console.log(adminId,"hhjh");
            
            const admin = await Admin.findById(adminId)
console.log(admin,"hih");

        if (!admin) {
            throw new Error("Admin not found");
        }

        return admin;
        } catch (error) {
            console.error("error in repo");
            
        }
    }


};
