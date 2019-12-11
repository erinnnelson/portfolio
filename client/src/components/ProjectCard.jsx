import React from 'react';

export default (props) => {

  const attachBaseToUrl = (imageUrl) => {
    return `http://localhost:3000/${imageUrl}`
  }
    

  return (
    <div className={props.project.live ? 'project-cards projects-live' : 'project-cards projects-not-live'}>
      <p>{props.project.title}</p>
      <p>{props.project.deployed}</p>
      <p>{props.project.description}</p>
      <img className='project-images' src={attachBaseToUrl(props.project.image)} alt={props.project.image} />
      <br />
      {props.project.skills.map(skill => (
        <img key={skill.id} className='skill-images' src={attachBaseToUrl(skill.image)} title={skill.name} alt={skill.name} />
        // <p>{skill.name}</p>
      ))}
      <br />
      <a href={props.project.github}>github</a>
      <br />
      <a href={props.project.url}>site</a>
    </div>
  )
}