import Schema from "../../database/index.js";
const { Chat, Message } = Schema

export const chatRepository = {
    createChat: async (userId, clientId) => {
        try {
            const existingChat = await Chat.findOne({
                members: { $all: [userId, clientId] }
            });

            if (existingChat) {
                return existingChat;
            }
            const newChat = new Chat({
                members: [userId, clientId],
            });

            const savedChat = await newChat.save();
            return savedChat;
        } catch (error) {
            throw error(error, "error in chatRepository")
        }
    },
    getchats: async (id) => {
        try {
            const chats = await Chat.find({
                members: { $in: [id] }
            })
            return chats
        } catch (error) {
            throw error(error, "error in chatRepository")

        }
    },
    findchats: async (id, seconid) => {
        try {
            // chat.findone({members:{$all:[id ,secondid]}})
        } catch (error) {
            throw error(error, "error in chatRepository")
        }
    },
    createMessage: async (data) => {
        const { senderId, message, chatId, read } = data
        try {
            const messages = new Message({
                chatId,
                senderId,
                message,
                read
            })
            messages.save()
            return messages
        } catch (error) {
            console.error(error, "errorin repo");
        }
    },
    getmessages: async (chatId) => {
        try {
            const messages = await Message.find({ chatId });
            return messages;
        } catch (error) {
            console.error(error, "errorin repo");
        }
    },
    addMessageFile: async (data, file) => {
        try {
            const { chatId, type, senderId, read } = data
            const messages = new Message({
                chatId: chatId,
                senderId: senderId,
                type: type,
                file: file,
                read: read

            })
            messages.save()
            return messages
        } catch (error) {
            throw new Error(error, "error in addMessageFile")
        }
    },
    unReadMessages: async (data) => {
        try {
            const { senderId, chatId } = data


            const count = await Message.countDocuments({
                chatId: chatId,
                senderId: senderId,
                read: false
            });

            return count

        } catch (error) {
            console.error(error, "errorin repo");
        }
    },
    markasread: async (data) => {
        try {
            const { currentChat, senderId } = data;
    
            // Log the inputs to ensure they are correct
            console.log("Marking as read:", { currentChat, senderId });
    
            const res = await Message.updateMany(
                {
                    chatId: currentChat,
                    senderId: senderId,
                    read: false
                },
                {
                    $set: { read: true }
                }
            );
    
            // Log the result to see how many documents were modified
            console.log("Update result:", res);
    
            return res;
    
        } catch (error) {
            console.error(error, "error in repo");
        }
    }
    
}