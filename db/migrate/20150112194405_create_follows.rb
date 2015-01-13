class CreateFollows < ActiveRecord::Migration
  def change
    create_table :follows do |t|
      t.integer :user_id, null: false
      t.integer :blog_id, null: false

    end
    add_index :follows, [:user_id, :blog_id], unique: true
  end
end
