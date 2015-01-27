class AddViewsToPosts < ActiveRecord::Migration
  def change
    change_table :posts do |t|
      t.integer :views, null: false
    end
  end
end
