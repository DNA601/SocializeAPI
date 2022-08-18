const router = require('express').Router();
const {
    getUsers,
    getUserID,
    createAUser,
    updateAUser,

    addAFriend,
    removeAFriend,
    deleteUser

} = require('../../controllers/userController');

router.route("/").get(getUsers).post(createAUser);
router.route("/:id").get(getUserID).put(updateAUser).delete(deleteUser);
router.route("/:userId/friends/:friendId").post(addAFriend).delete(removeAFriend);

module.exports = router;