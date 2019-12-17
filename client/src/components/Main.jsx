import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { Link } from 'react-router-dom';
import { getProjects, destroyProject } from '../services/api-helper';

export default (props) => {

  return (

    <div>
      <p>Current Projects:</p>
      <div id='projects-container'>
        {props.projects.map(project => {
          if (props.currentUser) {
            return (
              <div key={project.id} className='project-containers' >
                <ProjectCard
                  project={project}
                  currentUser={props.currentUser}
                  openModal={props.openModal}
                />
              </div>
            )
          } else {
            if (project.live) {
              return (
                <div key={project.id} className='project-containers'>
                  <ProjectCard
                    project={project}
                  />
                </div>
              )
            }
          }
        })}
      </div>

      {props.currentUser && <button onClick={() => props.openModal(false)}>Add A Project</button>}
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