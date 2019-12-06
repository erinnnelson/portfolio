import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Main from './components/Main'
import { loginUser, registerUser, getProjects, destroyProject, createProject, getCategories, createCategory, getSkills, createSkill } from './services/api-helper'
import Login from './components/Login'
import decode from 'jwt-decode';
import './App.css';
// import Register from './components/Register'

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

  const handleLogin = async () => {
    const userData = await loginUser(authFormData);
    setCurrentUser(decode(userData.token));
    localStorage.setItem("jwt", userData.token)
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

  // PROJECT DELETE

  const handleProjectDelete = async (id) => {
    let destroyedProject = await destroyProject(id);
    setProjects(prev => (
      prev.filter(project => (
        project.id !== destroyedProject.id
      ))
    ))
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
        image: res.image,
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

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    const res = await createSkill(skillFormData);
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
    <div className="App">
      {/* <Register
          handleRegister={handleRegister}
          handleChange={authHandleChange}
          formData={authFormData} /> */}

      <Route exact path="/" render={() => (
        <Main
          currentUser={currentUser}
          handleLogout={handleLogout}
          projects={projects}
          handleProjectDelete={handleProjectDelete}
          handleProjectFormDataChange={handleProjectFormDataChange}
          handleProjectFormDataCheckboxChange={handleProjectFormDataCheckboxChange}
          handleProjectFormDataDropFileChange={handleProjectFormDataDropFileChange}
          projectFormData={projectFormData}
          handleProjectSubmit={handleProjectSubmit}
          handleProjectFormDataModelsCheckboxChange={handleProjectFormDataModelsCheckboxChange}
          handleCategoryFormDataChange={handleCategoryFormDataChange}
          // categories={categories}
          categoryFormData={categoryFormData}
          handleCategorySubmit={handleCategorySubmit}
          handleSkillFormDataChange={handleSkillFormDataChange}
          // skills={skills}
          skillFormData={skillFormData}
          handleSkillSubmit={handleSkillSubmit}
        />
      )} />

      <Route exact path="/admin" render={() => (
        <Login
          handleLogin={handleLogin}
          handleChange={authHandleChange}
          formData={authFormData}
        />
      )} />

    </div>
  );
}

export default withRouter(App);