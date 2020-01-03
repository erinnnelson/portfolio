import React, { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm';
import SkillForm from './SkillCreateForm';
import { DropzoneArea } from 'material-ui-dropzone';
import { baseUrl } from '../services/api-helper';
import ProjectFormHeaderPack from './project_form_components/ProjectFormHeaderPack';
import ProjectFormLivePack from './project_form_components/ProjectFormLivePack';
import ProjectFormCheckboxPack from './project_form_components/ProjectFormCheckboxPack';


export default (props) => {

  const attachBaseToUrl = (imageUrl) => {
    return `${baseUrl}/${imageUrl}`
  }

  const [toggleDeleteCheck, setToggleDeleteCheck] = useState(false)

  return (
    <div className='form-containers'>
      <ProjectFormHeaderPack
        title='Edit Project'
        projectFormData={props.projectFormData}
        handleChange={props.handleInputChange}
        setProjectFormData={props.setProjectFormData}
      />
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
      <ProjectFormLivePack
        projectFormData={props.projectFormData}
        handleChange={props.handleInputChange}
        setProjectFormData={props.setProjectFormData}
        handleCheckboxChange={props.handleCheckboxChange}
      />
      <ProjectFormCheckboxPack
        seeAdditionalModelEditView={props.seeAdditionalModelEditView}
        projectFormData={props.projectFormData}
        handleModelsCheckboxChange={props.handleModelsCheckboxChange}
        setProjectFormData={props.setProjectFormData}
      />
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