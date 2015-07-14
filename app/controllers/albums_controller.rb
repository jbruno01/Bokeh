class AlbumsController < ApplicationController

  def new
    @album = current_user.albums.new
  end

  def create
    @album = current_user.albums.new(album_params)

    if @album.save
      redirect_to user_url(current_user)
    else
      flash.now[:errors] = @album.errors.full_messages
      render :new
    end
  end



  private

  def album_params
    params.require(:album).permit(:title, :user_id, :description)
  end
end
