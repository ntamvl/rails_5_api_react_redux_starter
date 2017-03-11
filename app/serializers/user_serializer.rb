class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :username, :created_at, :updated_at
end
