import React from 'react';
import { baseUrl } from '../services/api-helper';
import github_color from '../assets/github_color.png'

export default (props) => {

  const attachBaseToUrl = (blob) => {
    return `${baseUrl}/${blob}`
  }


  return (

    <div className='project-card-containers'>
      <div className={props.project.live ? 'project-cards projects-live' : 'project-cards projects-not-live'}>
        <a href={props.project.url} target="_blank">
          <img className='project-images' src={attachBaseToUrl(props.project.image)} alt={props.project.title} />
        </a>
        <p className='project-titles'>{props.project.title}</p>
        <p>{props.project.description}</p>
        <br />
        {
          props.project.skills.map(skill => (
            <img key={skill.id} className='skill-images' src={attachBaseToUrl(skill.image)} title={skill.name} alt={skill.name} />
            // <p>{skill.name}</p>
          ))
        }
        <br />
        <a href={props.project.github} target="_blank">
          <img className='github-img-links' src={github_color} alt='github' />
        </a>
        <br />
      </div >
      {props.currentUser && <button onClick={() => props.openModal(true, props.project)}>update</button>}
      {props.currentUser && <button onClick={() => props.handleProjectDelete(props.project.id)}>delete</button>}
    </div>
  )
}