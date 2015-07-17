module Api
  class CommentsController < ApiController

    def new
      @comment = Comment.new
    end

    def create
      @comment = Comment.create(comment_params)
      if @comment.save
        render :show
      else
        render json: @comment.errors.full_messages, status: :unprocessable_entity
      end
    end

    def show
      @comment = Comment.find(params[:id])
      if @comment
        render :show
      else
        render :json @comment.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      @comments = Comment.where(photo_id: params[:id])
      render :show
    end

    private

    def comment_params
      params.require(:comment).permit(:user_id, :photo_id, :content)
    end

  end
end
