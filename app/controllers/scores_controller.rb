class ScoresController < ApplicationController
    before_action :authorized
    # before_action :check_score, only: [:update]

    def index
        user = User.find_by(id: session[:user_id])
        level = user.levels.find(params[:level_id])
        scores = level.scores.where(user_id: user.id)
        render json: scores, include: :level
    end

    def create
        user = User.find_by(id: session[:user_id])
        if score_params[:level_attributes]
            score = user.scores.create(score_params)
            if score.valid?
                
                render json: score, include: :level, status: :created
            else
                render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
            end
        elsif score_params[:level_id]
            score = user.scores.create(points: score_params[:points], user_id: score_params[:user_id], level_id: score_params[:level_id])
            if score.valid?
                render json: score, include: :level, status: :created
            else
                render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
            end
        else
            level = user.levels.find_by(id: params[:level_id])
            new_score = level.scores.create(score_params)
            if new_score[:points] == nil ||  new_score[:user_id] == nil || new_score[:level_id] == nil
                render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
            else
                user.scores << new_score
                render json: new_score, include: :level, status: :created
            end 
        end
    end

    def update
        user = User.find_by(id: session[:user_id])
        score = user.scores.find_by(id: params[:id])
        level = score.level.find_by(id: params[:id])
        @level_difficulty = score.level.where(level_difficulty: params[:level_difficulty]).exists?
        points = score.points
            if points <= 45
                @level_difficulty === Level.first.level_difficulty
            end
            if points >= 46 && points <= 90
            @level_difficulty === Level.second.level_difficulty
            end
            if points >=91 && points <= 135
                @level_difficulty === Level.third.level_difficulty
            end
            if points >= 135 
                @level_difficulty === Level.last.level_difficulty
            end
            level.update(score_params[:level_attributes])
        if score and score.update(score_params)
            render json: score, include: :level
        else
            render json: { error: "Not Authorized"}, status: :unauthorized
        end
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        score = user.scores.find_by(id: params[:id])
        if score
            score.destroy
            head :no_content   
        else
            render json: { error: "Not Authorized"}, status: :unauthorized
        end
    end

    private 

    # def check_score
    #     user = User.find_by(id: session[:user_id])
    #     score = user.scores.find_by(id: params[:id])
    #     points = score.find_by(points: params[:points])&.points
    #    ## level - user.scores.level.find_by(level_difficulty: params[:level_difficulty])

    #     if points <= 45
    #         @level_difficulty === Level.first.level_difficulty
    #     end
    #     if points >= 46 && points <= 90
    #        @level_difficulty === Level.second.level_difficulty
    #     end
    #     if points >=91 && points <= 135
    #         @level_difficulty === Level.third.level_difficulty
    #     end
    #     if points >= 135 
    #         @level_difficulty === Level.last.level_difficulty
    #     end
    # end

    def score_params
        params.require(:score).permit(:points, :user_id, :level_id, level_attributes: [:level_difficulty])
    end

    def authorized
        return render json: {error: "unauthorized" }, status: :unauthorized unless session.include? :user_id
    end
end
