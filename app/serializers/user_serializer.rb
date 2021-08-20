class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password, :password_confirmation
  has_many :scores, dependent: :destroy
  has_many :levels, through: :scores
end
