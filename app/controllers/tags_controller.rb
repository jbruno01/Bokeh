class TagsController < ApplicationController

  def create
    @tag = Tag.new(tag_params)
    if @tag.save
      render json: @tag
    else
      render json: @tag.errors.full_messages, status: :unprocessable_entity
  end

  private

  def tag_params
    params.require(:tag).permit(:name)
  end
end
