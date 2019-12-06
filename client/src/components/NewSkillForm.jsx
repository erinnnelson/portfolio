import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone'


export default (props) => {

  return (
    <div>
      <input
        name='name'
        type='text'
        placeholder='Add Skill?'
        autoComplete='off'
        value={props.skillFormData.name}
        onChange={props.handleChange}
      />
      <button onClick={props.handleSubmit}>add</button>
    </div>
  )
}