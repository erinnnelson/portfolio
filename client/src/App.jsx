import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Main from './components/Main'
import ModalView from './components/ModalView'
import { loginUser, registerUser, getProjects, destroyProject, updateProject, createProject, getCategories, createCategory, getSkills, createSkill } from './services/api-helper'
import Login from './components/Login'
import decode from 'jwt-decode';
import './App.css';
import Modal from 'react-modal-slider';
import 'react-modal-slider/lib/main.css';
import Register from './components/Register'

function App(props) {

  // PROJECTS

  // GET PROJECTS

  const [projects, setProjects] = useState([])

  const [projectFilter, setProjectFilter] = useState('All')

  const [currentProjectCategories, setCurrentProjectCategories] = useState([])

  const updateCurrentProjectCategories = (currentProjects) => {
    let everyCategoryListing = []
    currentProjects.forEach(project => {
      project.categories.forEach(category => {
        everyCategoryListing.push(category.name)
      })
    })
    setCurrentProjectCategories([...new Set(everyCategoryListing)])
  }

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

  const [projectCreateFormData, setProjectCreateFormData] = useState({
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

  const resetProjectCreateFormData = () => {
    setProjectCreateFormData(prev => ({
      ...prev,
      title: '',
      description: '',
      live: false,
      github: '',
      url: '',
      deployed: getDateToday(),
      image: null,
      categories: prev.categories.map(category => ({
        name: category.name,
        id: category.id,
        checked: false
      })),
      skills: prev.skills.map(skill => ({
        name: skill.name,
        image: skill.image,
        id: skill.id,
        checked: false
      }))
    }))
  }

  const [projectEditFormData, setProjectEditFormData] = useState({
    id: null,
    title: '',
    description: '',
    live: false,
    github: '',
    url: '',
    deployed: getDateToday(),
    display_image: null,
    image: null,
    updateImage: false,
    categories: [],
    skills: []
  })

  const setProjectEditFormDataUpdateImage = (state) => {
    setProjectEditFormData(prev => ({
      ...prev,
      updateImage: state
    }))
  }

  const updateProjectEditFormData = (project) => {
    setProjectEditFormData(prev => ({
      id: project.id,
      title: project.title,
      description: project.description,
      live: project.live,
      github: project.github,
      url: project.url,
      deployed: project.deployed,
      display_image: project.image,
      image: null,
      updateImage: false,
      categories: prev.categories.map(category => {
        let boxChecked = false;
        project.categories.forEach(attachedCategory => {
          if (category.id === attachedCategory.id) {
            boxChecked = true;
          }
        })
        return {
          name: category.name,
          id: category.id,
          checked: boxChecked
        }
      }),
      skills: prev.skills.map(skill => {
        let boxChecked = false;
        project.skills.forEach(attachedSkill => {
          if (skill.id === attachedSkill.id) {
            boxChecked = true;
          }
        })
        return {
          name: skill.name,
          image: skill.image,
          id: skill.id,
          checked: boxChecked
        }
      })
    }))
  }

  const [projectIsEdit, setProjectIsEdit] = useState(true)

  const [newProjectFormToggle, setNewProjectFormToggle] = useState(false)

  const [modalViewIsProjectForm, setModalViewIsProjectForm] = useState(true)

  const toggleVisibleModal = () => {
    setNewProjectFormToggle(prev => (!prev))
  };

  const openModal = (isEdit, project) => {
    setModalViewIsProjectForm(true)
    setProjectIsEdit(isEdit)
    setNewProjectFormToggle(true)
    if (isEdit) {
      updateProjectEditFormData(project)
    }
  }

  const callProjects = async () => {
    let res = await getProjects();
    console.log(res)
    setProjects(res);
    updateCurrentProjectCategories(res)
  }

  // POST NEW PROJECT

  const handleProjectFormDataChange = (e, selectedSetProjectFormState) => {
    const { name, value } = e.target;
    selectedSetProjectFormState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleProjectFormDataCheckboxChange = (e, selectedSetProjectFormState) => {
    const { name, checked } = e.target;
    selectedSetProjectFormState(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const handleProjectFormDataModelsCheckboxChange = (e, i, model, selectedSetProjectFormState) => {
    const { checked } = e.target;
    selectedSetProjectFormState(prev => {
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

  const handleProjectFormDataDropFileChange = (files, selectedSetProjectFormState) => {
    selectedSetProjectFormState(prev => ({
      ...prev,
      image: files[0]
    }));
  };

  const compileProject = (selectedProjectFormState, compileImage) => {
    let data = new FormData();
    let categoryIdsString = ''
    selectedProjectFormState.categories.forEach(category => {
      if (category.checked) {
        categoryIdsString += `${category.id},`
      }
    })
    let skillIdsString = ''
    selectedProjectFormState.skills.forEach(skill => {
      if (skill.checked) {
        skillIdsString += `${skill.id},`
      }
    })
    categoryIdsString = categoryIdsString.slice(0, -1)
    console.log(categoryIdsString)
    data.append('title', selectedProjectFormState.title);
    data.append('description', selectedProjectFormState.description);
    data.append('live', selectedProjectFormState.live);
    data.append('github', selectedProjectFormState.github);
    data.append('url', selectedProjectFormState.url);
    data.append('deployed', selectedProjectFormState.deployed);
    compileImage && data.append('image', selectedProjectFormState.image);
    data.append('category_ids', categoryIdsString)
    data.append('skill_ids', skillIdsString)
    return data;
  }

  const handleProjectCreate = async (e) => {
    e.preventDefault();
    setNewProjectFormToggle(false);
    // console.log(projectCreateFormData)
    const projectData = compileProject(projectCreateFormData, true);
    // for (var pair of projectData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    const res = await createProject(projectData);
    setProjects(prev => ([...prev, res]))
    resetProjectCreateFormData();
  }

  const handleProjectDelete = async (id) => {
    let destroyedProject = await destroyProject(id);
    setProjects(prev => (
      prev.filter(project => (
        project.id !== destroyedProject.id
      ))
    ))
  }

  const handleProjectUpdate = async (e, id, updateImage) => {
    e.preventDefault();
    setNewProjectFormToggle(false);
    // console.log(projectEditFormData)
    const projectData = compileProject(projectEditFormData, updateImage);
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

  const [categoryFormData, setCategoryFormData] = useState({
    name: ''
  })

  const callCategories = async () => {
    let res = await getCategories();
    // setCategories(res);
    setProjectCreateFormData(prev => ({
      ...prev,
      categories: res.map(category => ({
        name: category.name,
        id: category.id,
        checked: false
      }))
    }))
    setProjectEditFormData(prev => ({
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
    setProjectCreateFormData(prev => ({
      ...prev,
      categories: [...prev.categories, {
        name: res.name,
        id: res.id,
        checked: false
      }]
    }))
    setProjectEditFormData(prev => ({
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
    setProjectCreateFormData(prev => ({
      ...prev,
      skills: res.map(skill => ({
        name: skill.name,
        image: skill.image,
        id: skill.id,
        checked: false
      }))
    }))
    setProjectEditFormData(prev => ({
      ...prev,
      skills: res.map(skill => ({
        name: skill.name,
        image: skill.image,
        id: skill.id,
        checked: false
      }))
    }))
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
    setProjectCreateFormData(prev => ({
      ...prev,
      skills: [...prev.skills, {
        name: res.name,
        image: res.image,
        id: res.id,
        checked: false
      }]
    }))
    setProjectEditFormData(prev => ({
      ...prev,
      skills: [...prev.skills, {
        name: res.name,
        image: res.image,
        id: res.id,
        checked: false
      }]
    }))
  }

  const callAdditionalModels = () => {
    callCategories();
    callSkills();
  }

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
      callAdditionalModels()
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



  useEffect(() => {
    checkUser();
    callProjects();
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
      {currentUser &&

        <div id={'form-modal'}>
          <Modal
            isOpen={newProjectFormToggle}
            width={'500px'}
            directionFrom={'right'}
            contentLabel={'project-form'}
            onRequestClose={toggleVisibleModal}
            setAppElement={'#root'}
            ariaHideApp={true}
            maxMediaWidth={500}
            className={'project-form-modal'}
            overlayClassName={'project-form-modal-overlay'}
          >
            <button className='close-modal-buttons' onClick={toggleVisibleModal}>X</button>
            <ModalView
              callAdditionalModels={callAdditionalModels}
              projectIsEdit={projectIsEdit}
              handleProjectFormDataChange={handleProjectFormDataChange}
              handleProjectFormDataCheckboxChange={handleProjectFormDataCheckboxChange}
              handleProjectFormDataDropFileChange={handleProjectFormDataDropFileChange}
              handleSkillFormDataDropFileChange={handleSkillFormDataDropFileChange}
              projectCreateFormData={projectCreateFormData}
              setProjectCreateFormData={setProjectCreateFormData}
              projectEditFormData={projectEditFormData}
              setProjectEditFormData={setProjectEditFormData}
              handleProjectCreate={handleProjectCreate}
              handleProjectUpdate={handleProjectUpdate}
              handleCategoryFormDataChange={handleCategoryFormDataChange}
              handleProjectFormDataModelsCheckboxChange={handleProjectFormDataModelsCheckboxChange}
              categoryFormData={categoryFormData}
              handleCategorySubmit={handleCategorySubmit}
              handleSkillFormDataChange={handleSkillFormDataChange}
              skillFormData={skillFormData}
              handleSkillSubmit={handleSkillSubmit}
              openModal={openModal}
              setProjectEditFormDataUpdateImage={setProjectEditFormDataUpdateImage}
              modalViewIsProjectForm={modalViewIsProjectForm}
              setModalViewIsProjectForm={setModalViewIsProjectForm}
            />
          </Modal>
        </div>
      }

      <Route exact path='/' render={() => (
        <Main
          currentUser={currentUser}
          handleLogout={handleLogout}
          projects={projects}
          projectFilter={projectFilter}
          setProjectFilter={setProjectFilter}
          projectCategories={currentProjectCategories}
          handleProjectDelete={handleProjectDelete}
          openModal={openModal}
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