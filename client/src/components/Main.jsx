import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { Link } from 'react-router-dom';
import { getProjects, destroyProject } from '../services/api-helper';

export default (props) => {



  return (
    <div id='main-container'>
      <header id='header'>
        <p id='header-title'>EN</p>
        <div id='header-links-container'>
          <p className='header-links'>portfolio</p>
          <p className='header-links'>contact</p>
          <p className='header-links'>linkedin</p>
          <p className='header-links'>github</p>
        </div>
      </header>
      <div id='hero-container'>
        <div id='hero-welcome-text-container'>
          <p id='hero-welcome-text'><span id='hero-welcome-text-first-half'>Hi, my name is Erinn.</span> <span id='hero-welcome-text-second-half'>I make websites and applications.</span></p>
        </div>
      </div>
      <div id='absolute-div'>
        <div id='portfolio-container'>
          <div>
            <select value={props.projectFilter} onChange={(e) => props.setProjectFilter(e.target.value)}>
              <option value="All">All</option>
              {props.projectCategories.sort().map((category, i) => (
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
        <div id='extra-scrolling-div'>

        </div>
      </div>
    </div>
  )
}