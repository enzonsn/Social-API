const router = require('express').Router();
const { getAllThoughts, getThoughtById, createThought, updateThought, addReaction, deleteThought, deleteReaction } = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

router.route('/:userId/friends/:friendId').post(addReaction).delete(deleteReaction);

module.exports = router;