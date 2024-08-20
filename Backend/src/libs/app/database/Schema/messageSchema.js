import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
    chatId: {
        type: String
    },
    senderId: {
        type: String
    },
    message: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: true,
        default: 'text',
    },
    file: {
        location: {
            type: String,
        },
        key: {
            type: String,
        }
    },
    read: {
        type: Boolean
      
    }

},
    {
        timestamps: true,
    }
)

const Message = mongoose.model('messages', messageSchema)
export { Message }