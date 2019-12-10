import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { Link } from 'react-router-dom';
import { getProjects, destroyProject } from '../services/api-helper';

export default (props) => {

  return (

    <div>
      <p>Current Projects:</p>
      {props.projects.map(project => (
        <div key={project.id} className='project-containers'>
          <ProjectCard
            project={project}
          />
          <button onClick={(e) => props.handleProjectUpdate(e, project.id)}>update</button>
          <button onClick={() => props.handleProjectDelete(project.id)}>delete</button>
        </div>
      ))}

      {props.currentUser && <button onClick={props.toggleVisibleModal}>Add A Project</button>}
      <div>
        {props.currentUser
          ?
          <button onClick={props.handleLogout}>logout</button>
          :
          <Link to='/admin'>admin</Link>
        }
      </div>
    </div>
  )
}