const router = require('express').Router();
const {
    getThoughts,
    createAThought,
    getThoughtId,
    reaction,
    updateThought
} = require('../../controllers/thoughtController')
router.route("/").get(getThoughts).post(createAThought);
router.route("/:id")
    .get(getThoughtId)
    .put(updateThought)
router.route('/:thoughtId/reactions').post(reaction);
module.exports = router;