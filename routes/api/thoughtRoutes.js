const router = require('express').Router();
const {
    getThoughts,
    createAThought,
    getThoughtId,
    reaction,
    updateThought,
    removeReaction,
    deleteAThought
} = require('../../controllers/thoughtController')
router.route("/").get(getThoughts).post(createAThought);
router.route("/:id")
    .get(getThoughtId)
    .put(updateThought)
    .delete(deleteAThought)

router.route('/:thoughtId/reactions').post(reaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);
module.exports = router;