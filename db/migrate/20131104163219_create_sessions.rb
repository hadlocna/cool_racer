class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.belongs_to :player
      t.belongs_to :game
      t.timestamps
    end
  end
end
