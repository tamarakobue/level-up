class CreateScores < ActiveRecord::Migration[6.1]
  def change
    create_table :scores do |t|
      t.integer :user_id
      t.integer :level_id
      t.integer :points, :default => 0

      t.timestamps
    end
  end
end
