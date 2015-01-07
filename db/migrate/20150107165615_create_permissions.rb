class CreatePermissions < ActiveRecord::Migration
  def change
    create_table :permissions do |t|
      t.integer :user_id, null: false
      t.integer :blog_id, null: false
      t.integer :role
      t.boolean :is_moderator, null: false, default: false
    end

    add_index :permissions, :user_id
    add_index :permissions, :blog_id
  end
end
