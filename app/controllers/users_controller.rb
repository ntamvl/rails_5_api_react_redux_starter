class UsersController < ApplicationController
  # include ActionController::HttpAuthentication::Basic
  include ActionController::HttpAuthentication::Token::ControllerMethods
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  def search
    page = params[:page] || 1
    page = page.to_i
    limit = params[:limit] || 5
    limit = limit.to_i
    total_users = User.count
    offset = (page - 1) * limit
    total_page = (total_users + limit - 1) / limit

    users = User.order(created_at: :desc).offset(offset).limit(limit)
    data = {
      total: total_users,
      have_more: page < total_page,
      current_page: page,
      total_page: total_page,
      items: users
    }
    render json: data
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  def login
    username = params[:username] || ''
    password = params[:password] || ''
    user = User.where("email = ? OR username = ?", username, username).first
    puts "username: #{user}, password: #{password}"
    if user.present? && !!user.authenticate(password)
      hmac_secret = Rails.application.secrets[:secret_key_base]
      iat = Time.now.to_i
      jti_raw = [hmac_secret, iat].join(':').to_s
      jti = Digest::MD5.hexdigest(jti_raw)
      jti_payload = { user: {
          username: user[:username],
          email: user[:email],
          name: user[:name]
        }, role: 'ADMIN', :iat => iat, :jti => jti }

      token = JWT.encode jti_payload, hmac_secret, 'HS256'

      render json: { id_token: token }, status: 200
    else
      render json: { message: "Unauthorized!" }, status: 429
    end
  end

  def logout
    puts "logout: #{params.to_json}"
    token = ""
    authenticate_with_http_token do |token_value, options|
      puts "token_value: #{token_value}"
      token = token_value
    end

    begin
      hmac_secret = Rails.application.secrets[:secret_key_base]
      # decoded_token = JWT.decode token, hmac_secret, true, { :verify_jti => proc { |jti| my_validation_method(jti) }, :algorithm => 'HS256' }
      decoded_token = JWT.decode token, hmac_secret, true, { :verify_jti => true, :algorithm => 'HS256' }
      puts "decoded_token: #{decoded_token}"
      render json: { message: "User logged out" }, status: 200
    rescue Exception => e
      render json: { message: "Invalid token" }, status: 500
    end
  end

  def signup
    user_info = {
      name: params[:name] || "",
      username: params[:username] || "",
      email: params[:email] || "",
      password: params[:password] || "",
      password_confirmation: params[:password_confirmation] || ""
    }
    @user = User.new(user_info)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def user_params
    params.require(:user).permit(:name, :email, :username, :password, :password_confirmation)
  end
end
