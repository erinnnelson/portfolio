import React from 'react';
import CategoryForm from './CategoryForm'
import SkillForm from './SkillForm'
import { DropzoneArea } from 'material-ui-dropzone'


export default (props) => {

  return (
    <div className='form-containers'>
      <h1 className='form-titles'>New Project</h1>
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
      <div className='project-image-drops'>
        <DropzoneArea
          onChange={props.handleDropFileChange}
          maxFileSize={30000000}
          filesLimit={1}
          acceptedFiles={['image/*']}
          showPreviews={false}
          showPreviewsInDropzone={true}
          dropzoneText={'Drop in the Project Image'}
        />
      </div>
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
      <label>Tools Used</label>
      <div className='project-form-skill-containers'>
        {props.projectFormData.skills && props.projectFormData.skills.map((skill, i) => (
          <div key={skill.id}>
            <input
              name={skill.name}
              checked={skill.checked}
              type='checkbox'
              onChange={(e) => props.handleModelsCheckboxChange(e, i, 'skills', props.setProjectFormData) }
            />
            {/* <img className='skill-images' src={skill.image} title={skill.name} alt={skill.name} /> */}
            <label>{skill.name}</label>
          </div>
        ))}
      </div>
      <br />
      {/* <CategoryForm
        handleChange={props.handleCategoryFormDataChange}
        categoryFormData={props.categoryFormData}
        handleSubmit={props.handleCategorySubmit}
      /> */}
      {/* <input
          type='file'
          name='image'
          accept="image/*"
          files={projectFormData.image}
          onChange={handleBasicFileChange}
        /><br /> */}
      <label htmlFor="">Tags</label>
      <div className='project-form-category-containers'>
        {props.projectFormData.categories && props.projectFormData.categories.map((category, i) => (
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
      {/* <SkillForm
        handleChange={props.handleSkillFormDataChange}
        handleDropFileChange={props.handleSkillFormDataDropFileChange}
        skillFormData={props.skillFormData}
        handleSubmit={props.handleSkillSubmit}
      /> */}
      <div className='project-form-submit-buttons-containers'>
        <button className='project-form-submit-buttons' onClick={props.handleSubmit}>SUBMIT</button>
      </div>
    </div>
  )
}