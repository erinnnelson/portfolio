class ProjectsController < ApplicationController
  # before_action :authorize_request, except: %i[index show]
  include Rails.application.routes.url_helpers

  # GET /projects
  def index
    @projects = Project.all
    projects_with_images = @projects.map do |project|
      new_project = project.attributes.symbolize_keys
      new_project[:image] = rails_blob_path(project.image, only_path: true)

      skills = project.skills
      skills_with_images = skills.map do |skill|
        new_skill = skill.attributes.symbolize_keys
        new_skill[:image] = rails_blob_path(skill.image, only_path: true)
        new_skill
      end

      new_project[:categories] = project.categories
      new_project[:skills] = skills_with_images
      new_project
    end
    render json: projects_with_images
  end

  # GET /projects/1
  def show
    @project = Project.find(params[:id]) 
    project_with_image = @project.attributes.symbolize_keys
    project_with_image[:image] = rails_blob_path(@project.image, only_path: true)


    skills = @project.skills
    # .with_attached_image
    skills_with_images = skills.map do |skill|
      new_skill = skill.attributes.symbolize_keys
      new_skill[:image] = rails_blob_path(skill.image, only_path: true)
      new_skill
    end

    project_with_image[:categories] = @project.categories
    project_with_image[:skills] = skills_with_images
    
    # logger.debug project_with_image[:id]
    render json: project_with_image

    # render json: { project: project_with_image, categories: @project.categories, skills: skills_with_images }
    
    # render json: { project: {
    #   id: project_with_image[:id], 
    #   title: project_with_image[:title],
    #   description: project_with_image[:description],
    #   live: project_with_image[:live],
    #   github: project_with_image[:github],
    #   url: project_with_image[:url],
    #   deployed: project_with_image[:deployed],
    #   created_at: project_with_image[:created_at],
    #   updated_at: project_with_image[:updated_at],
    #   image: project_with_image[:image],
    #   categories: @project.categories,
    #   skills: skills_with_images
    # } }
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