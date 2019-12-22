import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { Link } from 'react-router-dom';
import { getProjects, destroyProject } from '../services/api-helper';

export default (props) => {



  return (



    <div>
      <div>
        <select value={props.projectFilter} onChange={(e) => props.setProjectFilter(e.target.value)}>
          <option value="All">All</option>
          {props.projectCategories.map((category, i) => (
            <option key={i} value={category}>{category}</option>
          ))}

        </select>
      </div>
      <div id='projects-container'>
        {props.projects.sort((a, b) => (
          a.deployed < b.deployed
            ?
            1
            :
            -1
        )).map(project => {
          if (props.currentUser) {
            if (props.projectFilter === 'All' || project.categories.map(category => (category.name)).includes(props.projectFilter)) {
              return (
                <div key={project.id} className='project-containers' >
                  <ProjectCard
                    project={project}
                    currentUser={props.currentUser}
                    openModal={props.openModal}
                  />
                </div>
              )
            }
          } else {
            if (project.live) {
              if (props.projectFilter === 'All' || project.categories.map(category => (category.name)).includes(props.projectFilter)) {
                return (
                  <div key={project.id} className='project-containers'>
                    <ProjectCard
                      project={project}
                    />
                  </div>
                )
              }
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