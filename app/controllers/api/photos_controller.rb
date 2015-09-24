module Api
  class PhotosController < ApiController

    wrap_parameters false

    def new
      @photo = Photo.new
    end

    def destroy
      @photo = current_user.photos.find(params[:id])
      @photo.try(:destroy)
      render json: {}
    end

    def index
      @photos = Photo.order(created_at: :desc)
      render :index
    end

    def create
      @photo = current_user.photos.new(photo_params)
      if @photo.save
        render :show
      else
        render json: @photo.errors.full_messages, status: 401
      end
    end

    def update
      @photo = Photo.find(params[:id])
      @photo.update!(photo_params)
      render :show
    end

    def edit
      @photo = Photo.find(params[:id])
      if @photo.update_attributes(photo_params)
        render :show
      end
    end

    def show
      @photo = Photo.find(params[:id])
      render :show
    end

    private

    def photo_params
      params.require(:photo).permit(:user_id, :description, :title, :image)
    end
  end
end
