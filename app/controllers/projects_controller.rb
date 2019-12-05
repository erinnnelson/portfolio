class ProjectsController < ApplicationController
  # before_action :authorize_request, except: %i[index show]

  # GET /projects
  def index
    @projects = Project.all
    render json: @projects, include: :categories
  end

  # GET /projects/1
  def show
    @project = Project.find(params[:id])
    render json: @project, include: :categories
  end

  # POST /projects
  def create
    @project = Project.new(project_params)
    if @project.save
      categories = project_params[:category_ids].split(',')
      # logger.info "HERE IS CATEGORIES: #{categories}"
      categories.each do |n|
          category = Category.where(id: n.to_i)
          @project.categories << category
      end
      render json: @project, include: :categories, status: :created, location: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /projects/1
  def update
    @project = Project.find(params[:id])
    if @project.update(project_params)
      render json: @project
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
      params.permit(:title, :description, :image, :live, :github, :url, :deployed, :category_ids)
    end
end