const { Thought, User } = require('../models');

const userControl = {
    getUsers(req, res) { // function will get all of the Users. 
        User.find({})
            .populate({
                path: "friends",
                select: "-__v",
            })
            .select("-__v")
            .sort({ _id: -1 })
            .then((userData) => res.json(userData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    getUserID({ params }, res) { //getting a user by their id
        User.findOne({ _id: params.id })
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            .then((userData) => {
                if (!userData) {
                    return res.status(404).json({ message: 'no uer found with id' });
                }
                res.json(userData)
            })
            .catch((err) => {
                console.log(err)
                res.sendStatus(400)
            })

    },
    createAUser({ params, body }, res) { //functionality to create a user.
        User.create(body)
            .then((userData) => res.json(userData))
            .catch((err) => res.json(err))


    },
    updateAUser({ params, body }, res) { //update a user
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then((userData) => {
                if (!userData) {
                    return res.status(404).json({ message: 'no uer found with id' });
                }
                res.json(userData)
            })
            .catch((err) => {
                console.log(err)
                res.sendStatus(400)
            })

    },

    addAFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId }, { $addToSet: { friends: params.friendId } }, { new: true, runValidators: true })
            .then((userData) => {
                if (!userData) {
                    res.status(404).json({ message: 'no user found' });
                    return;
                }
                res.json(userData);
            })
            .catch((err) => res.json(err));
    },
}


module.exports = userControl;