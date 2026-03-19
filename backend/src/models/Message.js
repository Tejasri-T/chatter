import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        receiverId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true  
        },
        text: {
            type: String,
            trim: true,
            maxlength: 2000,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

// expireAfterSeconds: 2592000 is exactly 30 days (60 * 60 * 24 * 30)
messageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });


const Message = mongoose.model('Message', messageSchema);

export default Message;