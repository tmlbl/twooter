var _ = require('underscore');

module.exports.parse = function (tweets) {
  var texts = _.pluck(tweets, 'text');
  var dates = _.pluck(tweets, 'created_at');
  var hashes = _.map(tweets, function (tweet) {
    return tweet.entities.hashtags;
  });
  var table = _.zip(texts, dates, hashes);
  return _.map(table, function (tweet) {
    return {
      text: tweet[0],
      date: tweet[1],
      hashtags: tweet[2]
    };
  });
};