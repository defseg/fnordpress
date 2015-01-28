class RemoveSessionTokenFromUser < ActiveRecord::Migration
  def up
    remove_column :users, :session_token
  end

  def down
    change_table :users do |t|
      t.string :session_token, null: false
    end
  end
end
