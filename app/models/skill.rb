class Skill < ApplicationRecord
  has_and_belongs_to_many :projects
  has_one_attached :image
end
