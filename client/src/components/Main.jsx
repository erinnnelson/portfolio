import React, { useState, useEffect } from 'react';
import ProjectForm from './ProjectForm';
import { getProjects, destroyProject } from '../services/api-helper';

export default (props) => {

  return (


    <div>
      {props.currentUser &&
        <div>
          <p>{props.currentUser && props.currentUser.username}</p>
          <button onClick={props.handleLogout}>logout</button>
        </div>
      }
      <p>Current Projects:</p>
      {props.projects.map(project => (
        <div className='project-containers'>
          <div className='project-cards' key={project.id}>
            <p>{project.title}</p>
            <p>{project.deployed}</p>
            <p>{project.description}</p>
            {project.categories.map(category => (
              <p>{category.name}</p>
            ))}
            <img className='project-images' src={project.image} alt={project.image} />
            {project.skills.map(skill => (
              <p>{skill.name}</p>
            ))}
            <a href={project.github}>github</a>
            <br />
            <a href={project.url}>site</a>
          </div>
          <button onClick={(e) => props.handleProjectUpdate(e, project.id)}>update</button>
          <button onClick={() => props.handleProjectDelete(project.id)}>delete</button>
        </div>
      ))}


      <ProjectForm
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