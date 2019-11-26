class ProjectsController < ApplicationController
  # before_action :authorize_request, except: %i[index show]

  # GET /projects
  def index
    @projects = Project.all
    render json: @projects
  end

  # GET /projects/1
  def show
    @project = Project.find(params[:id])
    render json: @project
  end

  # POST /projects
  def create
    @project = Project.new(project_params)

    if @project.save
      render json: @project, status: :created, location: @project
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
      params.permit(:title, :description, :image, :live, :github, :url, :deployed)
    end
end
