class UsersController < ApplicationController
  def new
    redirect_to new_user_registration_path
  end

  def create
    user = User.new(user_params)
    if user.save
      log_in(user)
      redirect_to root_url
    else
      flash.now[:errors] = user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def new_guest
    new_id = (User.last) ? (User.last.id + 1).to_s : "1"
    user = User.new(password: "guestguest",
                    email: "guest" + new_id + "@example.com",
                    name: "guest" + new_id)

    if user.save
      sign_in(user)
      redirect_to root_url
    else
      flash[:errors] = user.errors.full_messages
      redirect_to root_url
    end
  end

  private

  def user_params
    params.require(:user).permit(:password, :email)
  end
end
