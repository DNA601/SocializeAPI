const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create User model
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        minlength: 1,
        maxlength: 280,
        required: true,

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
    reactions: [reactionSchema],
}, {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});

// Create a virtual property.
thoughtSchema.virtual('reactionCount')
    // Getter
    .get(function() {
        return `${this.reactions.length}`;
    })
    // Setter to set the first and last name


// Initialize our User model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;