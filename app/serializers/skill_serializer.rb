class SkillSerializer < ActiveModel::Serializer
  attributes :id, :name, :created_at, :updated_at, :image

  def image
    object.image.service_url if object.image.attached?
  end
end
