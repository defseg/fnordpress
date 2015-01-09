class Api::UsersController < Api::ApiController

  def show
    @user = (User.where(id: params[:id]).includes(:permissions).includes(:blogs)).first
    render :show
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email)
  end
end
