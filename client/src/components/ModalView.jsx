import React, { useState, useEffect } from 'react';
import ProjectCreateForm from './ProjectCreateForm';
import ProjectEditForm from './ProjectEditForm';
import CategoryForm from './CategoryForm'
import SkillForm from './SkillForm'

export default (props) => {

  const [additionalModelViewIsSkills, setAdditionalModelViewIsSkills] = useState(true)

  const seeAdditionalModelEditView = (modelIsSkills) => {
    setAdditionalModelViewIsSkills(modelIsSkills)
    props.setModalViewIsProjectForm(false)
  }

  return (
    <div>
      {props.modalViewIsProjectForm
        ?
        <div className='project-forms-containers'>
          {props.projectIsEdit
            ?
            <ProjectEditForm
              handleChange={props.handleProjectFormDataChange}
              handleCheckboxChange={props.handleProjectFormDataCheckboxChange}
              handleDropFileChange={props.handleProjectFormDataDropFileChange}
              projectFormData={props.projectEditFormData}
              setProjectFormData={props.setProjectEditFormData}
              handleSubmit={props.handleProjectUpdate}
              handleModelsCheckboxChange={props.handleProjectFormDataModelsCheckboxChange}
              setUpdateImage={props.setProjectEditFormDataUpdateImage}
              seeAdditionalModelEditView={seeAdditionalModelEditView}
            />
            :
            <ProjectCreateForm
              handleChange={props.handleProjectFormDataChange}
              handleCheckboxChange={props.handleProjectFormDataCheckboxChange}
              handleDropFileChange={props.handleProjectFormDataDropFileChange}
              projectFormData={props.projectCreateFormData}
              setProjectFormData={props.setProjectCreateFormData}
              handleSubmit={props.handleProjectCreate}
              handleModelsCheckboxChange={props.handleProjectFormDataModelsCheckboxChange}
              seeAdditionalModelEditView={seeAdditionalModelEditView}
            />
          }
        </div>
        :
        <div className='additional-models-forms-containers'>
          {additionalModelViewIsSkills
            ?
            <div>
              <SkillForm
                handleChange={props.handleSkillFormDataChange}
                handleDropFileChange={props.handleSkillFormDataDropFileChange}
                skillFormData={props.skillFormData}
                handleSubmit={props.handleSkillSubmit}
              />
            </div>
            :
            <div>
              <CategoryForm
                handleChange={props.handleCategoryFormDataChange}
                categoryFormData={props.categoryFormData}
                handleSubmit={props.handleCategorySubmit}
              />
            </div>
          }
          <button onClick={() => props.setModalViewIsProjectForm(true)}>{"<- back"}</button>
        </div>
      }
    </div>
  )
}