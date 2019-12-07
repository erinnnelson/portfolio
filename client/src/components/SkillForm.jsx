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
      /> <br />
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
      <button onClick={props.handleSubmit}>add</button>
    </div>
  )
}