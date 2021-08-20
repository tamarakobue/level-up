class User < ApplicationRecord
    has_many :scores, dependent: :destroy
    has_many :levels, through: :scores

    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :password, presence: :true
end
