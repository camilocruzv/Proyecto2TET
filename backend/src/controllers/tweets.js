const tweetsCtrl = {};

const Tweet = require('../models/Tweet');

tweetsCtrl.getTweets = async (req, res) => {
    const tweets = await Tweet.find();
    res.json(tweets);
};

tweetsCtrl.createTweet = async (req, res) => {
    const { usuario, tweet } = req.body;
    const newTweet = new Tweet({
        usuario,
        tweet
    })
    await newTweet.save();
    res.json({message: 'Tweet Saved'})
};

tweetsCtrl.getTweet = async (req, res) => {
    const tweet = await Tweet.findById(req.params.id);
    res.json(tweet);
};

tweetsCtrl.updateTweet = async (req, res) => {
    const { usuario, tweet } = req.body;
     await Tweet.findOneAndUpdate({_id: req.params.id},{
        usuario,
        tweet
    });
    res.json({message: 'Tweet Updated'})
};

tweetsCtrl.deleteTweet = async (req, res) => {
    await Tweet.findByIdAndDelete(req.params.id);
    res.json({message: 'Tweet Deleted'})
};


tweetsCtrl.searchTweets = async (req, res) => {
    const tweets = await Tweet.find({tweet: {$regex : '.*' + '#' + req.params.tweet + '.*'}});
    res.json(tweets);
};

tweetsCtrl.searchUser = async (req, res) => {
    const tweets = await Tweet.find({usuario: req.params.usuario});
    res.json(tweets);
};

module.exports = tweetsCtrl;