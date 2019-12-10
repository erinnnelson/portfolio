import React from 'react';

export default (props) => {

  return (
    <div className='project-cards'>
      <p>{props.project.title}</p>
      <p>{props.project.deployed}</p>
      <p>{props.project.description}</p>
      {props.project.categories.map(category => (
        <p key={category.id}>{category.name}</p>
      ))}
      <img className='project-images' src={props.project.image} alt={props.project.image} />
      <br />
      {props.project.skills.map(skill => (
        <img key={skill.id} className='skill-images' src={skill.image} title={skill.name} alt={skill.name} />
        // <p>{skill.name}</p>
      ))}
      <br />
      <a href={props.project.github}>github</a>
      <br />
      <a href={props.project.url}>site</a>
    </div>
  )
}