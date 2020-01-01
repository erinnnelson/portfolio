import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone'


export default (props) => {

  return (
    <div>
      <input
        name='name'
        type='text'
        placeholder='Name...'
        autoComplete='off'
        value={props.skillFormData.name}
        onChange={props.handleChange}
      /> <br />
      <input
        name='order'
        type='text'
        placeholder='Order...'
        autoComplete='off'
        value={props.skillFormData.order}
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
      <button onClick={(e) => props.handleSubmit(e, true)}>add</button>
    </div>
  )
}