import React, { useState, useEffect } from 'react';
import NewProjectForm from './NewProjectForm';
import { getProjects, destroyProject } from '../services/api-helper';

export default (props) => {

  return (


    <div>
      <p>{props.currentUser && props.currentUser.username}</p>
      <button onClick={props.handleLogout}>logout</button>
      <p>Current Projects:</p>
      {props.projects.map(project => (
        <div key={project.id}>
          <p>{project.title}</p>
          <p>{project.description}</p>
          <p>{project.category}</p>
          <img className ='project-images' src={project.image} alt="" />
          <p>{project.url}</p>
          <button onClick={() => props.handleProjectDelete(project.id)}>delete</button>
        </div>
      ))}


      <NewProjectForm
        handleChange={props.handleProjectFormDataChange}
        handleCheckboxChange={props.handleProjectFormDataCheckboxChange}
        handleDropFileChange={props.handleProjectFormDataDropFileChange}
        handleSkillFormDataDropFileChange={props.handleSkillFormDataDropFileChange}
        projectFormData={props.projectFormData}
        handleSubmit={props.handleProjectSubmit}
        categories={props.categories}
        handleCategoryFormDataChange={props.handleCategoryFormDataChange}
        handleModelsCheckboxChange={props.handleProjectFormDataModelsCheckboxChange}
        categoryFormData={props.categoryFormData}
        handleCategorySubmit={props.handleCategorySubmit}
        skills={props.skills}
        handleSkillFormDataChange={props.handleSkillFormDataChange}
        skillFormData={props.skillFormData}
        handleSkillSubmit={props.handleSkillSubmit}
      />
    </div>
  )
}