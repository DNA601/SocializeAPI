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

};
module.exports = userControl;