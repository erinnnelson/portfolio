import React, { useState } from 'react';
import NewCategoryForm from './NewCategoryForm'
import { DropzoneArea } from 'material-ui-dropzone'


export default (props) => {

  return (
    <div>
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
      {props.projectFormData.categories && props.projectFormData.categories.map((category, i) => (
        <div key={category.id}>
          <label>{category.name}</label>
          <input
            name={category.name}
            type='checkbox'
            onChange={(e) => { props.handleCategoriesChange(e, i) }}
          />
        </div>
      ))}
      <br />
      {/* <NewCategoryForm
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
      <DropzoneArea
        onChange={props.handleDropFileChange}
        maxFileSize={30000000}
        filesLimit={1}
        acceptedFiles={['image/*']}
        showPreviews={false}
        showPreviewsInDropzone={true}
        dropzoneText={''}
      /><br />
      <button onClick={props.handleSubmit}>create project</button>
    </div>
  )
}