class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :blog_id, null: false
      t.integer :author_id, null: false
      t.string :title
      t.text :content, null: false
      t.integer :status, null: false

      t.timestamps
    end
  end
end
