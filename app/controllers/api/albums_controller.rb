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
      @albums = Album.where(user_id: params[:user_id])
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

    def destroy
      @album = current_user.albums.find(params[:id])
      @album.try(:destroy)
      render json: {}
    end



    private

    def album_params
      params.require(:album).permit(:title, :user_id, :description)
    end
  end
end
