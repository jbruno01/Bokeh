class Api::UsersController < ApplicationController

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      render :show
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.find_by_id(params[:id])
    render :show
  end

  def update
    @user = User.find(params[:id])
    @user.update!(user_params)
    render :show
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :name, :avatar_url, :banner_url)
  end

end
