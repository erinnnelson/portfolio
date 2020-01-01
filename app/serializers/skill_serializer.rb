class SkillSerializer < ActiveModel::Serializer
  attributes :id, :name, :created_at, :updated_at, :image, :order

  def image
    object.image.service_url if object.image.attached?
  end
end

# class SkillSerializer < ActiveModel::Serializer
#   include FastJsonapi::ObjectSerializer
#   attributes :id, :name, :created_at, :updated_at

#   attribute :product_image_url do |object|
#     Rails.application.routes.url_helpers.url_for(object.image)
#   end
# end