class AddOrderToSkills < ActiveRecord::Migration[5.2]
  def change
    add_column :skills, :order, :integer
  end
end
