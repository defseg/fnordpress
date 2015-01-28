class RemoveUsernameFromUser < ActiveRecord::Migration
  def up
    remove_column :users, :username
  end

  def down
    change_table :users do |t|
      t.string :username, null: false
    end
  end
end
