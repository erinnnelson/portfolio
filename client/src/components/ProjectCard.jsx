import React from 'react';
import { baseUrl } from '../services/api-helper';
import github_color from '../assets/github_color.png'
import Moment from 'react-moment';

export default (props) => {

  const attachBaseToUrl = (blob) => {
    return `${baseUrl}/${blob}`
  }


  return (

    <div className='project-card-containers'>
      <div className={props.project.live ? 'project-cards projects-live' : 'project-cards projects-not-live'}>
        <a href={props.project.url} target="_blank">
          <div className='project-image-links'>
            <img className='project-images' src={attachBaseToUrl(props.project.image)} title='Live Site' alt={props.project.title} />
            <div className='project-deployed-dates'>
              <Moment format="MMM YYYY">{props.project.deployed}</Moment>
            </div>
          </div>
        </a>
        <div className='title-and-github-divs'>
          <p className='project-titles'>{props.project.title}</p>
          <a href={props.project.github} target="_blank">
            <img className='github-img-links' src={github_color} title='Github' alt='github' />
          </a>
        </div>
        <p>{props.project.description}</p>
        <br />
        {props.project.skills.map(skill => (
          <img key={skill.id} className='skill-images' src={attachBaseToUrl(skill.image)} title={skill.name} alt={skill.name} />
          // <p>{skill.name}</p>
        ))}
        <br />
      </div >
      {props.currentUser && <button onClick={() => props.openModal(true, props.project)}>update</button>}
    </div>
  )
}