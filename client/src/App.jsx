import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Main from './components/Main'
import ProjectForm from './components/ProjectForm';
import { loginUser, registerUser, getProjects, destroyProject, updateProject, createProject, getCategories, createCategory, getSkills, createSkill } from './services/api-helper'
import Login from './components/Login'
import decode from 'jwt-decode';
import './App.css';
import Modal from 'react-modal-slider';
import 'react-modal-slider/lib/main.css';
import Register from './components/Register'

function App(props) {

  // USER AUTH

  const [currentUser, setCurrentUser] = useState(null)

  const [authFormData, setAuthFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const checkUser = () => {
    const userItem = localStorage.getItem("jwt");
    if (userItem) {
      const user = decode(userItem);
      setCurrentUser(user);
      console.log(user)
    }
  }

  const resetAuthFormData = () => {
    setAuthFormData({
      username: '',
      email: '',
      password: ''
    })
  }

  const handleLogin = async () => {
    const userData = await loginUser(authFormData);
    setCurrentUser(decode(userData.token));
    localStorage.setItem("jwt", userData.token)
    resetAuthFormData();
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    await registerUser(authFormData);
    handleLogin();
  }

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
  }

  const authHandleChange = (e) => {
    const { name, value } = e.target;
    setAuthFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // PROJECTS

  // GET PROJECTS

  const [projects, setProjects] = useState([])

  const getDateToday = () => {
    const today = new Date;
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`
    }
    if (mm < 10) {
      mm = `0${mm}`
    }
    return `${yyyy}-${mm}-${dd}`;
  }

  const [projectFormData, setProjectFormData] = useState({
    title: '',
    description: '',
    live: false,
    github: '',
    url: '',
    deployed: getDateToday(),
    image: null,
    categories: [],
    skills: []
  })

  const callProjects = async () => {
    let res = await getProjects();
    console.log(res)
    setProjects(res);
  }

  // POST NEW PROJECT

  const handleProjectFormDataChange = (e) => {
    const { name, value } = e.target;
    setProjectFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleProjectFormDataCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProjectFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const handleProjectFormDataModelsCheckboxChange = (e, i, model) => {
    const { checked } = e.target;
    setProjectFormData(prev => {
      const newArr = prev[model];
      newArr[i] = {
        ...newArr[i],
        checked: checked
      }
      return {
        ...prev,
        [model]: newArr
      }
    })
  }

  const handleProjectFormDataDropFileChange = (files) => {
    setProjectFormData(prev => ({
      ...prev,
      image: files[0]
    }));
  };

  const compileProject = () => {
    let data = new FormData();
    let categoryIdsString = ''
    projectFormData.categories.forEach(category => {
      if (category.checked) {
        categoryIdsString += `${category.id},`
      }
    })
    let skillIdsString = ''
    projectFormData.skills.forEach(skill => {
      if (skill.checked) {
        skillIdsString += `${skill.id},`
      }
    })
    categoryIdsString = categoryIdsString.slice(0, -1)
    console.log(categoryIdsString)
    data.append('title', projectFormData.title);
    data.append('description', projectFormData.description);
    data.append('live', projectFormData.live);
    data.append('github', projectFormData.github);
    data.append('url', projectFormData.url);
    data.append('deployed', projectFormData.deployed);
    data.append('image', projectFormData.image);
    data.append('category_ids', categoryIdsString)
    data.append('skill_ids', skillIdsString)
    return data;
  }

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    console.log(projectFormData)
    const projectData = compileProject();
    // for (var pair of projectData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    const res = await createProject(projectData);
    setProjects(prev => ([...prev, res]))
  }

  const handleProjectDelete = async (id) => {
    let destroyedProject = await destroyProject(id);
    setProjects(prev => (
      prev.filter(project => (
        project.id !== destroyedProject.id
      ))
    ))
  }

  const handleProjectUpdate = async (e, id) => {
    e.preventDefault();
    console.log(projectFormData)
    const projectData = compileProject();
    let res = await updateProject(id, projectData);
    setProjects(prev => prev.map(project => {
      if (project.id === res.id) {
        return res;
      } else {
        return project
      }
    }))
  }

  // CATEGORIES

  // const [categories, setCategories] = useState([])

  const [categoryFormData, setCategoryFormData] = useState({
    name: ''
  })

  const callCategories = async () => {
    let res = await getCategories();
    // setCategories(res);
    setProjectFormData(prev => ({
      ...prev,
      categories: res.map(category => ({
        name: category.name,
        id: category.id,
        checked: false
      }))
    }))
  }

  const handleCategoryFormDataChange = (e) => {
    const { name, value } = e.target;
    setCategoryFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const res = await createCategory(categoryFormData);
    // setCategories(prev => ([...prev, res]))
    setProjectFormData(prev => ({
      ...prev,
      categories: [...prev.categories, {
        name: res.name,
        id: res.id,
        checked: false
      }]
    }))
  }

  // SKILLS

  // const [skills, setSkills] = useState([])

  const [skillFormData, setSkillFormData] = useState({
    name: '',
    image: null,
  })

  const callSkills = async () => {
    let res = await getSkills();
    // setSkills(res);
    setProjectFormData(prev => ({
      ...prev,
      skills: res.map(skill => ({
        name: skill.name,
        image: skill.image,
        id: skill.id,
        checked: false
      }))
    }))
    console.log(res)
  }

  const handleSkillFormDataChange = (e) => {
    const { name, value } = e.target;
    setSkillFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSkillFormDataDropFileChange = (files) => {
    setSkillFormData(prev => ({
      ...prev,
      image: files[0]
    }));
  };

  const compileSkill = () => {
    let data = new FormData();
    data.append('name', skillFormData.name);
    data.append('image', skillFormData.image);
    return data;
  }

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    const skillData = compileSkill();
    // for (var pair of skillData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    const res = await createSkill(skillData);
    // setSkills(prev => ([...prev, res]))
    setProjectFormData(prev => ({
      ...prev,
      skills: [...prev.skills, {
        name: res.name,
        image: res.image,
        id: res.id,
        checked: false
      }]
    }))
  }

  const [newProjectFormToggle, setNewProjectFormToggle] = useState(true)

  const toggleVisibleModal = () => {
    setNewProjectFormToggle(prev => (!prev))
  };

  const closeVisibleModal = () => {
    setNewProjectFormToggle(false)
  }


  useEffect(() => {
    checkUser();
    callProjects();
    callCategories();
    callSkills();
  }, [])

  // -------------- AUTH ------------------

  // const handleLoginButton = () => {
  //   props.history.push("/login")
  // }

  return (
    <div className='App'>
      {/* <Register
          handleRegister={handleRegister}
          handleChange={authHandleChange}
          formData={authFormData} /> */}

      <div id={'form-modal'}>
        <Modal
          // default false
          isOpen={newProjectFormToggle}
          // default 60%
          width={'500px'}
          // default from right
          directionFrom={'right'}
          // default Modal
          contentLabel={'project-form'}
          onRequestClose={toggleVisibleModal}
          // optional for accessibility
          setAppElement={'#root'}
          // default false allows you to skip setAppElement prop for react-modal
          ariaHideApp={true}
          // allow you to set the maximum width of the viewport
          // at which the modal will be expanded to full screen
          maxMediaWidth={500}
          // allows you to decorate a className or overlayClassName
          className={'project-form-modal'}
          overlayClassName={'project-form-modal-overlay'}
        >
          <button className='close-modal-buttons' onClick={toggleVisibleModal}>X</button>
          {currentUser &&
            <ProjectForm
              handleChange={handleProjectFormDataChange}
              handleCheckboxChange={handleProjectFormDataCheckboxChange}
              handleDropFileChange={handleProjectFormDataDropFileChange}
              handleSkillFormDataDropFileChange={handleSkillFormDataDropFileChange}
              projectFormData={projectFormData}
              handleSubmit={handleProjectSubmit}
              // categories={props.categories}
              handleCategoryFormDataChange={handleCategoryFormDataChange}
              handleModelsCheckboxChange={handleProjectFormDataModelsCheckboxChange}
              categoryFormData={categoryFormData}
              handleCategorySubmit={handleCategorySubmit}
              // skills={props.skills}
              handleSkillFormDataChange={handleSkillFormDataChange}
              skillFormData={skillFormData}
              handleSkillSubmit={handleSkillSubmit}
            />
          }
        </Modal>

      </div>

      <Route exact path='/' render={() => (
        <Main
          currentUser={currentUser}
          handleLogout={handleLogout}
          projects={projects}
          handleProjectDelete={handleProjectDelete}
          handleProjectUpdate={handleProjectUpdate}
          toggleVisibleModal={toggleVisibleModal}
        />
      )} />

      <Route exact path='/admin' render={() => (
        <Login
          handleLogin={handleLogin}
          handleChange={authHandleChange}
          formData={authFormData}
          currentUser={currentUser}
        />
      )} />
    </div>
  );
}

export default withRouter(App);