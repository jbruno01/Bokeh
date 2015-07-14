class AlbumsController < ApplicationController

  def new
    @album = current_user.albums.new
  end

  def create
    @album = current_user.albums.new(album_params)

    if @album.save
      redirect_to user_albums_url(current_user)
    else
      flash.now[:errors] = @album.errors.full_messages
      render :new
    end
  end

  def index
    if params.has_key?(:user_id)
      @albums = Album.where(user_id: params[:user_id])
    else
      @albums = Album.all
    end

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
