class ProjectsController < ApplicationController
  # before_action :authorize_request, except: %i[index show]
  include Rails.application.routes.url_helpers

  # GET /projects
  def index
    @projects = Project.all
    render json: @projects, include: [:categories, :skills]
  end

  # GET /projects/1
  def show
    @project = Project.find(params[:id]) 
    @skills = Skill.all.with_attached_image
    skills_with_images = @skills.map do |skill|
      new_skill = skill.attributes.symbolize_keys
      new_skill[:image] = rails_blob_path(skill.image, only_path: true)
      new_skill
    end

    # skills_with_images = @project.skills.map do |skill_sans_image| 
    #   skill = @skills.select {|skill_with_image| skill_with_image.id == skill_sans_image.id}
    #   {skill: skill}
    # end

    # render json: @project
    render json: { project: @project, categories: @project.categories, skills: skills_with_images }
  end

  # POST /projects
  def create
    @project = Project.new(project_params)
    if @project.save
      categories = project_params[:category_ids].split(',')
      @project.categories = []
      categories.each do |n|
        category = Category.where(id: n.to_i)
        @project.categories << category
      end
      skills = project_params[:skill_ids].split(',')
      @project.skills = []
      skills.each do |n|
        skill = Skill.where(id: n.to_i)
        @project.skills << skill
      end
      render json: @project, include: [:categories, :skills], status: :created, location: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /projects/1
  def update
    @project = Project.find(params[:id])
    if @project.update(project_params)
      categories = project_params[:category_ids].split(',')
      @project.categories = []
      categories.each do |n|
        category = Category.where(id: n.to_i)
        @project.categories << category
      end
      skills = project_params[:skill_ids].split(',')
      @project.skills = []
      skills.each do |n|
        skill = Skill.where(id: n.to_i)
        @project.skills << skill
      end
      render json: @project, include: [:categories, :skills]
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # DELETE /projects/1
  def destroy
    @project = Project.find(params[:id])
    @project.destroy
    render json: @project, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # def set_project
    #   @project = Project.find(params[:id])
    # end

    # Only allow a trusted parameter "white list" through.
    def project_params
      params.permit(:title, :description, :image, :live, :github, :url, :deployed, :category_ids, :skill_ids)
    end
end