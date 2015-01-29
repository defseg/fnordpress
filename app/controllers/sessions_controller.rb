class SessionsController < ApplicationController

  def new
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      sign_in(@user)
      redirect_to new_user_session_url
    else
      flash[:errors] = ["Invalid username or password."]
      redirect_to new_user_session_url
    end
  end

  def destroy
    log_out
    redirect_to root_url
  end
end
