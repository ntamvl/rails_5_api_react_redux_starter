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
    username = params[:user] || ''
    password = params[:password] || ''
    user = User.where("email = ? OR username = ?", username, username).first
    puts "username: #{user}, password: #{password}"
    if user.present? && !!user.authenticate(password)
      hmac_secret = Rails.application.secrets[:secret_key_base]
      iat = Time.now.to_i
      jti_raw = [hmac_secret, iat].join(':').to_s
      jti = Digest::MD5.hexdigest(jti_raw)
      jti_payload = { user: username, role: 'ADMIN', :iat => iat, :jti => jti }

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

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def user_params
    params.require(:user).permit(:name, :email)
  end
end
