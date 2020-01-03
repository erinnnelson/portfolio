import React from 'react';

export default (props) => {

  return (
    <div>
      <br />
      <button onClick={() => props.seeAdditionalModelEditView(true)}>Skills</button>
      <div className='project-form-skill-containers'>
        {props.projectFormData.skills && props.projectFormData.skills.sort((a, b) => a.order > b.order ? 1 : -1).map((skill, i) => (
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
      {/* <input
          type='file'
          name='image'
          accept="image/*"
          files={projectFormData.image}
          onChange={handleBasicFileChange}
        /><br /> */}
      <br />
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
    </div>
  )
}