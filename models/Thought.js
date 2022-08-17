const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema({
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
    },
    id: false,
});

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
    .virtual('reactionCount')
    // Getter
    .get(function() {
        return `${this.reactions.length}`;
    })
    // Setter to set the first and last name


// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;