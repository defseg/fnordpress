class RemovePasswordDigestFromUser < ActiveRecord::Migration
  def up
    remove_column :users, :password_digest
  end

  def down
    change_table :users do |t|
      t.string :password_digest, null: false
    end
  end
end
