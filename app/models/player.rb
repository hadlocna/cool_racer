class Player < ActiveRecord::Base
  has_many :sessions
  has_many :games, through: :sessions
end
