import React, { useState, useEffect } from 'react';
import NewProjectForm from './NewProjectForm';
import { getProjects, destroyProject } from '../services/api-helper';

export default (props) => {

  // const [projects, setProjects] = useState([])

  // const callProjects = async () => {
  //   let res = await getProjects();
  //   setProjects(res);
  // }

  // const handleProjectDelete = async (id) => {
  //   let res = await destroyProject(id);
  //   console.log(res)
  // }

  // useEffect(() => {
  //   callProjects();

  // }, [])

  return (


    <div>
      <p>{props.currentUser && props.currentUser.username}</p>
      <button onClick={props.handleLogout}>logout</button>
      <p>Current Projects:</p>
      {props.projects.map(project => (
        <div key={project.id}>
          <p>{project.title}</p>
          <p>{project.description}</p>
          <p>{project.category}</p>
          <img src={project.image} alt="" />
          <p>{project.url}</p>

          <button onClick={() => { props.handleProjectDelete(project.id) }}>delete</button>
        </div>
      ))}


      <NewProjectForm />
    </div>
  )
}