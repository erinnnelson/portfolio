class Project < ApplicationRecord
  has_and_belongs_to_many :skills
  has_and_belongs_to_many :categories
  belongs_to :user
  has_one_attached :image
end
