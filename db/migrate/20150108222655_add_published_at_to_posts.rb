class AddPublishedAtToPosts < ActiveRecord::Migration
  def change
    change_table :posts do |t|
      t.datetime :published_at
    end
  end
end
