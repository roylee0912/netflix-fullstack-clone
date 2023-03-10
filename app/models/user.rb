class User < ApplicationRecord
    has_many :profiles
    has_secure_password
    
    validates :username, presence: true, uniqueness: true
end
