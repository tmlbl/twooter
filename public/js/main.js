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
  io.emit('handle', { handle: hand });
});

io.on('twoots', function (twoots) {
  $('#twoots').html(' ');
  twats = twoots;
  for (var tw in twats) {
    $('#twoots').append(maker(twats[tw]));
  }
});