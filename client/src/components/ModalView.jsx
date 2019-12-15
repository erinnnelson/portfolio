import React, { useState, useEffect } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import ProjectCreateForm from './ProjectCreateForm';
import ProjectEditForm from './ProjectEditForm';

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
              seeAdditionalModelEditView={seeAdditionalModelEditView}
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
              seeAdditionalModelEditView={seeAdditionalModelEditView}
            />
          }
        </div>
        :
        <div className='additional-models-forms-containers'>
          {additionalModelViewIsSkills
            ?
            < div >
              skills

            </div>
            :
            <div>
              categories

            </div>
          }
        </div>
      }
      <button onClick={() => props.setModalViewIsProjectForm(prev => (!prev))}>switch</button>
    </div>

  )
}