function Player(name, id) {
  this.name = name;
  this.id = id;
  this.position = 1;
}

Player.prototype.advancePlayer = function() {
  this.position++;
  game.render(this);
  game.gameWinner(this);
}

var game = {
  winner : 'none',
  time : 0,
  liveBoard : true,
  secondsLeft : 5,

  render : function(player){
    var pos = player.position
    $('#'+player.name).children().removeClass();
    $('#'+player.name+' td:nth-child('+pos+')').next().addClass('active');
  },

  gameWinner : function(player){
    if (player.position >= 12){
      game.winner = player.name;
      game.finish(player);
    }
  },

  finish : function (player) {
    game.liveBoard = false;
    game.endTime = new Date().getTime();
    game.totalTime = (game.endTime - game.startTime);
    document.getElementById('timer_div').innerHTML = player.name + ' Wins in ' + game.totalTime/1000 + ' seconds';
    $.post(window.location.pathname, {winner_id: player.id, total_time: game.totalTime, _method: "put"});
  },

  countDown : function(){
    var interval = setInterval(function() {
      document.getElementById('timer_div').innerHTML = --game.secondsLeft;
      if (game.secondsLeft <= 0){
        document.getElementById('timer_div').innerHTML = 'RACEEEEEEEE!';
        game.startTime = new Date().getTime();
        clearInterval(interval);
        game.keyPress();
      }
    },1000)
  },

  keyPress : function(){
    $(document).on('keyup', function(event) {
      if(game.liveBoard) {
        if (event.which == 65 ) {
          player1.advancePlayer();
        }
        if (event.which == 76) {
          player2.advancePlayer();
        }
      }

    });
  }
};

var playGame = function() {
  playerRows = $('tbody').children();

  player1 = new Player(playerRows[0].id,$('#'+playerRows[0].id).data("player-id"));
  player2 = new Player(playerRows[1].id,$('#'+playerRows[1].id).data("player-id"));
  game.countDown();
}

$(document).ready(function() {
  var player1;
  var player2;
  playGame();
});
