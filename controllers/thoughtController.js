const { Thought, User } = require("../models");

const thoughtControl = {
    createAThought({ params, body }, res) { //creating a users thought
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: _id } }, { new: true });
            })
            .then((userData) => {
                if (!userData) {
                    return res
                        .status(404)
                        .json({ message: 'no user found' });
                }

                res.json({ message: 'a thought has been born' });
            })
            .catch((err) => res.json(err));
    },
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getThoughts(req, res) { //will get user thoughts
        Thought.find({})
            .populate({
                path: 'reactions',
                select: "-__v",
            })
            .select("-__v")
            .sort({ _id: -1 })
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getThoughtId({ params }, res) { //getting a thought by an id.
        Thought.findOne({ _id: params.id })
            .populate({
                path: "reactions",
                select: "-__v",
            })
            .select("-__v")
            .then((thoughtData) => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'id does not exist. no thought found' });
                }
                res.json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    updateThought({ params, body }, res) { // this will be updating thoughts. 
        Thought.findOneAndUpdate({ _id: params.id }, body, {
                new: true,
                runValidators: true,
            })
            .then((thoughtData) => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'thought id not found' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch((err) => res.json(err));
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    reaction({ params, body }, res) { // this will be adding reactions
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $addToSet: { reactions: body } }, { new: true, runValidators: true })
            .then((thoughtData) => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'thought id not found' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch((err) => res.json(err));
    },


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}
module.exports = thoughtControl;