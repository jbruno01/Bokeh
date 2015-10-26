class Api::TaggingsController < ApplicationController

  def create
    @tagging = Tagging.new(tagging_params)
    @tag = find_or_create_tag(:name)
    @tagging.tag_id = @tag.id
    if @tagging.save
      render json: @tagging
    else
      render json: @tagging.errors.full_messages
    end
  end

  def destroy
    @tagging = Tagging.find(params[:id])
    if @tagging.destroy
      render {}
    end
  end
 
  private
    def tagging_params
      params.require(:tagging).permit(:photo_id, :tag_name)
    end
end
