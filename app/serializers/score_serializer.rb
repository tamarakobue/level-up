class ScoreSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :level_id, :points
  belongs_to :user
  belongs_to :level
end
