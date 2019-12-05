class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :live, :github, :url, :deployed, :created_at, :updated_at, :image

  def image
    object.image.service_url if object.image.attached?
  end
end
