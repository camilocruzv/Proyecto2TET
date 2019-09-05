const { Router } = require('express');
const router = Router();

const { getTweets, createTweet, getTweet, updateTweet, deleteTweet, searchTweets, searchUser } = require('../controllers/tweets');

router.route('/')
    .get(getTweets)
    .post(createTweet);

router.route('/:id')
    .get(getTweet)
    .put(updateTweet)
    .delete(deleteTweet);

router.route('/search_tweet/:tweet').get(searchTweets);

router.route('/search_user/:usuario').get(searchUser);

module.exports = router;