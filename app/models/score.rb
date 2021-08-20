class Score < ApplicationRecord
    belongs_to :user
    belongs_to :level
    accepts_nested_attributes_for :level, reject_if: :all_blank
end
