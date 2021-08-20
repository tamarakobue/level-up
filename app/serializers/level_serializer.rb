class LevelSerializer < ActiveModel::Serializer
  attributes :id, :level_difficulty
  has_many :scores
  has_many :users, through: :scores
end
