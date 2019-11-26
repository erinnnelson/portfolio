class CreateProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :projects do |t|
      t.string :title
      t.text :description
      t.boolean :live
      t.string :github
      t.string :url
      t.date :deployed

      t.timestamps
    end
  end
end
