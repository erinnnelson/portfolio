import React from 'react';

export default (props) => {

  return (
    <div>
      <p className='form-titles'>{props.title}</p>
      <div>
        <input
          name='title'
          className='project-form-titles'
          type='text'
          placeholder='Title...'
          autoComplete='off'
          value={props.projectFormData.title}
          onChange={(e) => props.handleChange(e, props.setProjectFormData)}
        />
      </div>
      <div>
        <textarea
          name='description'
          className='project-form-descriptions'
          placeholder='Description...'
          cols='30'
          rows='3'
          value={props.projectFormData.description}
          onChange={(e) => props.handleChange(e, props.setProjectFormData)}
        />
      </div>
    </div>
  )
}
