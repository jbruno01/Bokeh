module Api
  class CommentsController < ApiController

    def new
      @comment = Comment.new
    end

    def create
      @comment = current_user.comments.create(comment_params)
      if @comment.save
        render :show
      else
        render json: @comment.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @comment = Comment.find(params[:id])
      if @comment.destroy
        render {}
      end
    end



    private

    def comment_params
      params.require(:comment).permit(:photo_id, :content)
    end

  end
end
