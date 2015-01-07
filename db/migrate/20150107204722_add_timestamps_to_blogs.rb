class AddTimestampsToBlogs < ActiveRecord::Migration
  def change
    change_table :blogs do |t|
      t.timestamps
    end
  end
end
