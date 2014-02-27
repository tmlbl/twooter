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
  }
  io.emit('handle', { handle: hand });
});

io.on('twoots', function (twoots) {
  $('#twoots').html(' ');
  twats = jumble(twoots);
  console.log(twats);
  twats = _.map(twats, function (tweet) {
    return { text: tweet, date: 'Just Now' };
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
    words = _.union(words, (tweet.text).split(' '));
  });
  nextWord = 5;
  for (var i = 0; i <= 20; i++) {
    var newTweet = '';
    var tweetLen = Math.floor(Math.random()*140);
    while (newTweet.length < tweetLen) {
      var index = Math.floor(Math.random()*words.length);
      newTweet += words[index] + ' ';
      while (words[index].length < 5) {
        index++;
        newTweet += words[index] + ' ';
      }
    }
    newTweets.push(newTweet);
  }
  return newTweets;
}