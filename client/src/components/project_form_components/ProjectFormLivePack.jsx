import React from 'react';

export default (props) => {

  return (
    <div>
      <div className='project-form-links-containers'>
        <input
          name='url'
          className='project-form-links'
          type='text'
          placeholder='Deployed URL...'
          autoComplete='off'
          value={props.projectFormData.url}
          onChange={(e) => props.handleChange(e, props.setProjectFormData)}
        />
        <input
          name='github'
          className='project-form-links'
          type='text'
          placeholder='Github URL...'
          autoComplete='off'
          value={props.projectFormData.github}
          onChange={(e) => props.handleChange(e, props.setProjectFormData)}
        />
      </div>
      <div className='project-form-deployment-info-containers'>
        <input
          name='deployed'
          className='project-form-deployment-date'
          type='date'
          value={props.projectFormData.deployed}
          onChange={(e) => props.handleChange(e, props.setProjectFormData)}
        />
        <div className='project-form-deployment-live'>
          <input
            name='live'
            type='checkbox'
            checked={props.projectFormData.live}
            onChange={(e) => props.handleCheckboxChange(e, props.setProjectFormData)}
          />
          <label>Live</label>
        </div>
      </div>
    </div>
  )
}
