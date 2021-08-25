class Score < ApplicationRecord
    belongs_to :user
    belongs_to :level
    accepts_nested_attributes_for :level, update_only: true
end
