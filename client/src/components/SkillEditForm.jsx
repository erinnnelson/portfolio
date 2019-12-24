import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone'
import { baseUrl } from '../services/api-helper';


export default (props) => {

  const attachBaseToUrl = (imageUrl) => {
    return `${baseUrl}/${imageUrl}`
  }

  return (
    <div>
      <div>
        {props.skills.map(skill => (
          <div>
            <p onClick={() => props.updateSkillEditFormData(skill)}>{skill.name}</p>
          </div>
        ))}
      </div>
      <input
        name='name'
        type='text'
        placeholder='Name...'
        autoComplete='off'
        value={props.skillFormData.name}
        onChange={props.handleChange}
      /> <br />
      <input
        name='order'
        type='text'
        placeholder='Order...'
        autoComplete='off'
        value={props.skillFormData.order}
        onChange={props.handleChange}
      />
      {props.skillFormData.update_image
        ?
        <div className='project-image-drops'>
          <button className='close-image-drop-buttons' onClick={() => props.setUpdateImage(false)}>X</button>
          <DropzoneArea
            onChange={props.handleDropFileChange}
            maxFileSize={30000000}
            filesLimit={1}
            acceptedFiles={['image/*']}
            showPreviews={false}
            showPreviewsInDropzone={true}
            dropzoneText={''}
          />
        </div>
        :
        <div onClick={() => props.setUpdateImage(true)}>
          <img className='skill-images' src={props.skillFormData.display_image} alt={props.skillFormData.title} />
        </div>
      }
      <button onClick={(e) => props.handleSubmit(e, props.skillFormData.id, props.skillFormData.update_image)}>udpate</button>
    </div>
  )
}