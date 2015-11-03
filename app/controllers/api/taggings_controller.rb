class Api::TaggingsController < ApplicationController

  def create
    @tagging = Tagging.new
    @tag = find_or_create_tag(tagging_params[:name])
    @tagging.tag_id = @tag.id
    @tagging.photo_id = tagging_params[:photo_id]
    if @tagging.save
      render :show
    else
      render json: @tagging.errors.full_messages
    end
  end

  def destroy
    @tagging = Tagging.find(params[:id])
    @tagging.try(:destroy)
    render json: {}
  end

  private
    def tagging_params
      params.require(:tagging).permit(:photo_id, :name)
    end
end
