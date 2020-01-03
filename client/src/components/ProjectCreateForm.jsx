import React from 'react';
import ProjectFormHeaderPack from './project_form_components/ProjectFormHeaderPack';
import { DropzoneArea } from 'material-ui-dropzone'
import ProjectFormLivePack from './project_form_components/ProjectFormLivePack';
import ProjectFormCheckboxPack from './project_form_components/ProjectFormCheckboxPack';


export default (props) => {

  return (
    <div className='form-containers'>
      <ProjectFormHeaderPack
        title='Edit Project'
        projectFormData={props.projectFormData}
        handleChange={props.handleInputChange}
        setProjectFormData={props.setProjectFormData}
      />
      <div className='project-image-drops'>
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
        <button className='project-form-submit-buttons' onClick={(e) => props.handleSubmit(e)}>SUBMIT</button>
      </div>
    </div>
  )
}