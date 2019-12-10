class SkillsController < ApplicationController
  # before_action :authorize_request, except: %i[index show]

  # GET /skills
  def index
    @skills = Skill.all

    render json: @skills
  end

  # GET /skills/1
  def show
    @skill = Skill.find(params[:id])
    render json: @skill
  end

  # POST /skills
  def create
    @skill = Skill.new(skill_params)

    if @skill.save
      render json: @skill, status: :created, location: @skill
    else
      render json: @skill.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /skills/1
  def update
    @skill = Skill.find(params[:id])
    if @skill.update(skill_params)
      render json: @skill
    else
      render json: @skill.errors, status: :unprocessable_entity
    end
  end

  # DELETE /skills/1
  def destroy
    @skill = Skill.find(params[:id])
    @skill.destroy
    render json: @skill, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # def set_skill
    #   @skill = Skill.find(params[:id])
    # end

    # Only allow a trusted parameter "white list" through.
    def skill_params
      params.permit(:name, :image)
    end
end
