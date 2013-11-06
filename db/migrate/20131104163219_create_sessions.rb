class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.integer :player_id
      t.integer :game_id
      t.belongs_to :player
      t.belongs_to :game
      t.timestamps
    end
  end
end
