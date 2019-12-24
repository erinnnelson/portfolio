import React, { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm'
import SkillForm from './SkillCreateForm'
import { DropzoneArea } from 'material-ui-dropzone'
import { baseUrl } from '../services/api-helper';


export default (props) => {

  const attachBaseToUrl = (imageUrl) => {
    return `${baseUrl}/${imageUrl}`
  }

  const [toggleDeleteCheck, setToggleDeleteCheck] = useState(false)

  return (
    <div className='form-containers'>
      <h1 className='form-titles'>Edit Project</h1>
      <input
        name='title'
        className='project-form-titles'
        type='text'
        placeholder='Title...'
        autoComplete='off'
        value={props.projectFormData.title}
        onChange={(e) => props.handleChange(e, props.setProjectFormData)}
      /><br />
      <textarea
        name='description'
        className='project-form-descriptions'
        placeholder='Description...'
        cols='30'
        rows='3'
        value={props.projectFormData.description}
        onChange={(e) => props.handleChange(e, props.setProjectFormData)}
      /><br />
      {props.projectFormData.update_image
        ?
        <div className='project-image-drops'>
          <button className='close-image-drop-buttons' onClick={() => props.setUpdateImage(false)}>X</button>
          <DropzoneArea
            onChange={(files) => props.handleDropFileChange(files, props.setProjectFormData)}
            maxFileSize={30000000}
            filesLimit={1}
            acceptedFiles={['image/*']}
            showPreviews={false}
            showPreviewsInDropzone={true}
            dropzoneText={'Drop in the Project Image'}
          />
        </div>
        :
        <div onClick={() => props.setUpdateImage(true)}>
          <img className='project-edit-current-images' src={attachBaseToUrl(props.projectFormData.display_image)} alt={props.projectFormData.title} />
        </div>
      }
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
      <br />
      <button onClick={() => props.seeAdditionalModelEditView(true)}>Skills</button>
      <div className='project-form-skill-containers'>
        {props.projectFormData.skills && props.projectFormData.skills.map((skill, i) => (
          <div key={skill.id}>
            <input
              name={skill.name}
              checked={skill.checked}
              type='checkbox'
              onChange={(e) => props.handleModelsCheckboxChange(e, i, 'skills', props.setProjectFormData)}
            />
            {/* <img className='skill-images' src={skill.image} title={skill.name} alt={skill.name} /> */}
            <label>{skill.name}</label>
          </div>
        ))}
      </div>
      <br />
      {/* <input
          type='file'
          name='image'
          accept="image/*"
          files={projectFormData.image}
          onChange={handleBasicFileChange}
        /><br /> */}
      <button onClick={() => props.seeAdditionalModelEditView(false)}>Categories</button>
      <div className='project-form-category-containers'>
        {props.projectFormData.categories && props.projectFormData.categories.sort((a, b) => (a.name.toUpperCase() < b.name.toUpperCase()) ? -1 : 1).map((category, i) => (
          <div key={category.id}>
            <input
              name={category.name}
              checked={category.checked}
              type='checkbox'
              onChange={(e) => props.handleModelsCheckboxChange(e, i, 'categories', props.setProjectFormData)}
            />
            <label>{category.name}</label>
          </div>
        ))}
      </div>
      <br />
      <div className='project-form-submit-button-containers'>
        <button className='project-form-submit-buttons' onClick={(e) => props.handleSubmit(e, props.projectFormData.id, props.projectFormData.update_image)}>UPDATE</button>
      </div>
      {toggleDeleteCheck
        ?
        <div className='project-form-delete-button-containers'>
          <button className='project-form-submit-buttons' onClick={() => setToggleDeleteCheck(false)}>CANCEL</button>
          <button className='project-form-delete-buttons' onClick={(e) => props.handleProjectDelete(props.projectFormData.id)}>CONFIRM</button>
        </div>
        :
        <div className='project-form-delete-button-containers'>
          <button className='project-form-delete-buttons' onClick={() => setToggleDeleteCheck(true)}>DELETE</button>
        </div>
}


      {/* <button onClick={() => console.log(props.projectFormData)}>check form state</button> */}
    </div>
  )
}