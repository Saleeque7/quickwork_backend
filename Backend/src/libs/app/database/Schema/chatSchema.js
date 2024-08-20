import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
    {
        members: {
            type: Array
        }
    },
    {
        timestamps: true,
    }
)

const Chat = mongoose.model('Chats',chatSchema)
export {Chat}