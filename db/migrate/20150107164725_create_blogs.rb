class CreateBlogs < ActiveRecord::Migration
  def change
    create_table :blogs do |t|
      t.string :path, null: false
      t.string :title, null: false
      t.string :tagline
    end
  end
end
