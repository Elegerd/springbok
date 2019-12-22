import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    fingerprint: String,
    expiresIn: Number,
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Session', SessionSchema);