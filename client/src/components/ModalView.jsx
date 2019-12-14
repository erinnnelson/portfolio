import React, { useState, useEffect } from 'react';
import ProjectCreateForm from './ProjectCreateForm';
import ProjectEditForm from './ProjectEditForm';

export default (props) => {

  return (
    <div>
      {
        <div>
          {props.projectIsEdit
            ?
            <ProjectEditForm
              handleChange={props.handleProjectFormDataChange}
              handleCheckboxChange={props.handleProjectFormDataCheckboxChange}
              handleDropFileChange={props.handleProjectFormDataDropFileChange}
              handleSkillFormDataDropFileChange={props.handleSkillFormDataDropFileChange}
              projectFormData={props.projectEditFormData}
              setProjectFormData={props.setProjectEditFormData}
              handleSubmit={props.handleProjectUpdate}
              handleCategoryFormDataChange={props.handleCategoryFormDataChange}
              handleModelsCheckboxChange={props.handleProjectFormDataModelsCheckboxChange}
              categoryFormData={props.categoryFormData}
              handleCategorySubmit={props.handleCategorySubmit}
              handleSkillFormDataChange={props.handleSkillFormDataChange}
              skillFormData={props.skillFormData}
              handleSkillSubmit={props.handleSkillSubmit}
              setUpdateImage={props.setProjectEditFormDataUpdateImage}
            />
            :
            <ProjectCreateForm
              handleChange={props.handleProjectFormDataChange}
              handleCheckboxChange={props.handleProjectFormDataCheckboxChange}
              handleDropFileChange={props.handleProjectFormDataDropFileChange}
              handleSkillFormDataDropFileChange={props.handleSkillFormDataDropFileChange}
              projectFormData={props.projectCreateFormData}
              setProjectFormData={props.setProjectCreateFormData}
              handleSubmit={props.handleProjectCreate}
              handleCategoryFormDataChange={props.handleCategoryFormDataChange}
              handleModelsCheckboxChange={props.handleProjectFormDataModelsCheckboxChange}
              categoryFormData={props.categoryFormData}
              handleCategorySubmit={props.handleCategorySubmit}
              handleSkillFormDataChange={props.handleSkillFormDataChange}
              skillFormData={props.skillFormData}
              handleSkillSubmit={props.handleSkillSubmit}
            />
          }
        </div>
      }
    </div>

  )
}