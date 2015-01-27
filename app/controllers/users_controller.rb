class UsersController < ApplicationController
  def new
    @user = User.new
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
    new_id = (User.last.id + 1).to_s
    puts "hello\n\n\n\n\n\n\n\n\n\n\n\n"
    user = User.new(username: "guest" + new_id,
                    password: "guestguest",
                    email: "guest" + new_id + "@example.com")

    if user.save
      log_in(user)
      redirect_to root_url
    else
      flash[:errors] = user.errors.full_messages
      redirect_to root_url
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email)
  end
end
