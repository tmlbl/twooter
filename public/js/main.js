var io = io.connect(),
    twats = [];

var template = '<div class="tweet">'+
'<p class="twtext">'+
'<%= text %>'+
'</p><p class="twdate">'+
'<%= date %>'+
'</p></div>';

var maker = _.template(template);

$('#submit').click(function () {
  var hand = $('#handle').val();
  if (!hand) {
    alert('Please enter a twitter handle.');
    return null;
  } else if (hand[0] == '@') {
    hand = hand.substring(1);
  }
  io.emit('handle', { handle: hand });
});

io.on('twoots', function (twoots) {
  $('#twoots').html(' ');
  twats = jumble(twoots);
  twats = _.map(twats, function (tweet) {
    return { text: tweet, date: new Date() };
  });
  for (var tw in twats) {
    $('#twoots').append(maker(twats[tw]));
  }
});

$("#handle").keyup(function(event){
    if(event.keyCode == 13){
      $("#submit").click();
    }
});

function jumble (tweets) {
  var words = [],
    newTweets = [];
  _.map(tweets, function (tweet) {
    words = words.concat(tweet.text.split(' '));
  });
  nextWord = 7;
  for (var i = 0; i <= 20; i++) {
    var newTweet = '';
    var tweetLen = Math.floor(Math.random()*140);
    while (newTweet.length < tweetLen) {
      var index = Math.floor(Math.random()*words.length);
      if (words[index].substring(0,4) != 'http') {
        newTweet += words[index] + ' ';
      }
      while (words[index].length < 5) {
        index++;
        if (words[index].substring(0,4) != 'http') {
          newTweet += words[index] + ' ';
        }
      }
    }
    newTweets.push(newTweet);
  }
  return newTweets;
}