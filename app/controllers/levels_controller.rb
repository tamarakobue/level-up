class LevelsController < ApplicationController
    before_action :authorized

    def index
        user = User.find_by(id: session[:user_id])
        levels = user.levels.uniq
        render json: levels
    end

    def indexAll
        levels = level.all
        render json: levels, include: :scores
    end

    def create
        user = User.find_by(id: session[:user_id])
        level = user.levels.create(level_params)
        if level
            render json: level, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        level = user.levels.find_by(id: params[:id])
        if level
            levs = level.scores
            levs.destroy_all 
            head :no_content   
        else
            render json: { error: "Not Authorized"}, status: :unauthorized
        end
    end

    private 

    def level_params
        params.permit(:level_difficulty)
    end

    def authorized
        return render json: {error: "unauthorized" }, status: :unauthorized unless session.include? :user_id
    end
end
