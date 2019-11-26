import React, { useState } from 'react';
import Axios from 'axios';
import { DropzoneArea } from 'material-ui-dropzone'
import { createProject } from '../services/api-helper'


export default (props) => {

  const getDateToday = () => {
    const today = new Date;
    return `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;
  }

  const [projectFormData, setProjectFormData] = useState({
    title: '',
    description: '',
    live: false,
    github: '',
    url: '',
    deployed: getDateToday(),
    image: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectFormData(prevProjectFormData => ({
      ...prevProjectFormData,
      [name]: value
    }))
  }

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setProjectFormData(prevFormData => ({
      ...prevFormData,
      live: checked
    }))
  }

  // const handleBasicFileChange = (e) => {
  //   const { files } = e.target;
  //   setProjectFormData(prevFormData => ({
  //     ...prevFormData,
  //     image: files[0]
  //   }));
  // };

  const handleDropFileChange = (files) => {
    setProjectFormData(prevFormData => ({
      ...prevFormData,
      image: files[0]
    }));
  };

  const compileProject = () => {
    let data = new FormData();
    data.append('title', projectFormData.title);
    data.append('description', projectFormData.description);
    data.append('live', projectFormData.live);
    data.append('github', projectFormData.github);
    data.append('url', projectFormData.url);
    data.append('deployed', projectFormData.deployed);
    data.append('image', projectFormData.image);
    return data;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = compileProject();
    const resp = await createProject(projectData);
    console.log(resp)
  }

  return (
      <form onSubmit={handleSubmit}>
        <input
          name='title'
          type='text'
          placeholder='Title...'
          autoComplete='off'
          value={projectFormData.title}
          onChange={handleChange}
        /><br />
        <textarea
          name='description'
          id=''
          placeholder='Description...'
          cols='30'
          rows='10'
          value={projectFormData.description}
          onChange={handleChange}
        /><br />
        <label htmlFor="">Live?</label><br />
        <input
          name='live'
          type='checkbox'
          checked={projectFormData.live}
          onChange={handleCheckboxChange}
        /><br />
        <input
          name='github'
          type='text'
          placeholder='Github Link...'
          autoComplete='off'
          value={projectFormData.github}
          onChange={handleChange}
        /><br />
        <input
          name='url'
          type='text'
          placeholder='Deployed Site...'
          autoComplete='off'
          value={projectFormData.url}
          onChange={handleChange}
        /><br />
        <label htmlFor="">Deployed:</label><br />
        <input
          name='deployed'
          type='date'
          value={projectFormData.deployed}
          onChange={handleChange}
        /><br />
        {/* <input
          type='file'
          name='image'
          accept="image/*"
          files={projectFormData.image}
          onChange={handleBasicFileChange}
        /><br /> */}
        <DropzoneArea
          onChange={handleDropFileChange}
          maxFileSize={30000000}
          filesLimit={1}
          acceptedFiles={['image/*']}
          showPreviews={false}
          showPreviewsInDropzone={true}
          dropzoneText={'Drop in the Project Image'}
        /><br/>
        <button>create project</button>
      </form>
  )
}