module Api
  class AlbumsController < ApiController

    def new
      @album = current_user.albums.new
    end

    def create
      @album = current_user.albums.new(album_params)

      if @album.save
        render json: @album
      else
        render json: @album.errors.full_messages
      end
    end

    def index
      # if params.has_key?(:user_id)
        @albums = Album.where(user_id: params[:user_id])
        # @user = User.find_by_id(params[:user_id])
      # else
        # @albums = Album.all
      # end

        render :index
    end

    def show
      @album = Album.find(params[:id])

      if @album
        render :show
      else
        redirect_to root_url
      end
    end



    private

    def album_params
      params.require(:album).permit(:title, :user_id, :description)
    end
  end
end
