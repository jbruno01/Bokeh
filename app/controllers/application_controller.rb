class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def sign_in(user)
    @current_user = user
    session[:session_token] = user.reset_token!
  end

  def sign_out!
    current_user.try(:reset_token!)
    session[:token] = nil
  end

  def find_or_create_tag(string)
    @tag = Tag.find_by name: string
    unless @tag
      @tag = Tag.create({name: string})
    end
    return @tag
  end

end
