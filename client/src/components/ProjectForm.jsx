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
        type='text'
        placeholder='Title...'
        autoComplete='off'
        value={props.projectFormData.title}
        onChange={props.handleChange}
      /><br />
      <textarea
        name='description'
        id=''
        placeholder='Description...'
        cols='30'
        rows='3'
        value={props.projectFormData.description}
        onChange={props.handleChange}
      /><br />
      <label htmlFor="">Categories</label><br />
      <div className='category-containers'>
        {props.projectFormData.categories && props.projectFormData.categories.map((category, i) => (
          <div key={category.id}>
            <input
              name={category.name}
              type='checkbox'
              onChange={(e) => { props.handleModelsCheckboxChange(e, i, 'categories') }}
            />
            <label>{category.name}</label>
          </div>
        ))}
      </div>
      <br />
      {/* <CategoryForm
        handleChange={props.handleCategoryFormDataChange}
        categoryFormData={props.categoryFormData}
        handleSubmit={props.handleCategorySubmit}
      /> */}
      <label>Live?</label><br />
      <input
        name='live'
        type='checkbox'
        checked={props.projectFormData.live}
        onChange={props.handleCheckboxChange}
      /><br />
      <input
        name='github'
        type='text'
        placeholder='Github Link...'
        autoComplete='off'
        value={props.projectFormData.github}
        onChange={props.handleChange}
      /><br />
      <input
        name='url'
        type='text'
        placeholder='Deployed Site...'
        autoComplete='off'
        value={props.projectFormData.url}
        onChange={props.handleChange}
      /><br />
      <label htmlFor="">Deployed:</label><br />
      <input
        name='deployed'
        type='date'
        value={props.projectFormData.deployed}
        onChange={props.handleChange}
      /><br />
      {/* <input
          type='file'
          name='image'
          accept="image/*"
          files={projectFormData.image}
          onChange={handleBasicFileChange}
        /><br /> */}
      <div className='project-image-drops'>
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
      <label>Skills</label><br />
      {props.projectFormData.skills && props.projectFormData.skills.map((skill, i) => (
        <div key={skill.id}>
          <input
            name={skill.name}
            type='checkbox'
            onChange={(e) => { props.handleModelsCheckboxChange(e, i, 'skills') }}
          />
          <img className='skill-images' src={skill.image} title={skill.name} alt={skill.name} />
          <label>{skill.name}</label>
        </div>
      ))}
      <br />
      {/* <SkillForm
        handleChange={props.handleSkillFormDataChange}
        handleDropFileChange={props.handleSkillFormDataDropFileChange}
        skillFormData={props.skillFormData}
        handleSubmit={props.handleSkillSubmit}
      /> */}
      <button onClick={props.handleSubmit}>create project</button>
    </div>
  )
}