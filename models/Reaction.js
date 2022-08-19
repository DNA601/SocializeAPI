const { Schema, Types } = require('mongoose');


const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()

    },
    createAt: {
        type: Date,
        default: Date.now,
        get: (time) => time


    },
    username: {
        type: String,
        required: true,
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },

}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
}, );


module.exports = reactionSchema;