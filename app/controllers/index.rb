enable :sessions

get '/' do
  redirect to '/games/new'
end

get '/games/new' do
  @player = nil
  erb :index
end

post '/games' do
  player1 = Player.create(name: params[:player1])
  player2 = Player.create(name: params[:player2])

  game = Game.create()

  game.players << player1
  game.players << player2

  redirect "/games/#{game.id}"
end

get '/games/:id' do
  game = Game.find(params[:id])

  @player1 = game.players[0]
  @player2 = game.players[1]

  erb :board
end

put '/games/:id' do
  puts params.inspect
  puts params[:winner_id]
  puts params[:total_time]
  puts params[:id]
  game = Game.find(params[:id].to_i)
  game.winner = params[:winner_id]
  game.winning_time = params[:total_time]
  game.save


  # redirect to "/games/#{params[:id]}"
end

get "/set_result" do
  # find game from game_id
  # update game with winner from params[:winner_id]
end