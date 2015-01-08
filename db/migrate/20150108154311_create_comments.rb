class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :author_id, null: false
      t.integer :post_id, null: false
      t.integer :parent_comment_id
      t.text :content
      t.timestamps
    end
  end
end
