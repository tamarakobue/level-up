class UsersController < ApplicationController
    def index
        users = User.all
        render json: users
    end

    def create
        user = User.create(user_params)
        if user.valid?
            user.scores.create(points: 0, user_id: user.id, level_id: Level.first.id)
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_message }, status: :uprocessable_entity
        end
    end

    def show
        # byebug
        user = User.find_by(id: session[:user_id])
        # byebug
        if user
            # byebug
            render json: user
        else
            render json: { error: "Not authorized"}, status: :unauthorized
        end
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end
end
