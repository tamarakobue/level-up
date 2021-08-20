class Level < ApplicationRecord
    validates :level_difficulty, presence: true
    has_many :scores
    has_many :users, through: :scores
end
