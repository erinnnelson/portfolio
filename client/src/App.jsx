import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Main from './components/Main'
import { loginUser, registerUser, getProjects, destroyProject, createProject, getCategories, createCategory } from './services/api-helper'
import Login from './components/Login'
import decode from 'jwt-decode';
import './App.css';
// import Register from './components/Register'

function App(props) {

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

  const getDateToday = () => {
    const today = new Date;
    return `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;
  }

  const [projects, setProjects] = useState([])

  const [projectFormData, setProjectFormData] = useState({
    title: '',
    description: '',
    live: false,
    github: '',
    url: '',
    deployed: getDateToday(),
    image: null,
    categories: []
  })

  const callProjects = async () => {
    let res = await getProjects();
    setProjects(res);
  }

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

  const handleProjectFormDataCategoriesChange = (e, i) => {
    const { name, checked } = e.target;
    setProjectFormData(prev => {
      const newArr = prev.categories;
      newArr[i] = {
        ...newArr[i],
        checked: checked
      }
      return {
        ...prev,
        categories: newArr
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
    data.append('title', projectFormData.title);
    data.append('description', projectFormData.description);
    data.append('live', projectFormData.live);
    data.append('github', projectFormData.github);
    data.append('url', projectFormData.url);
    data.append('deployed', projectFormData.deployed);
    data.append('image', projectFormData.image);
    data.append('category_ids', projectFormData.categories.map(category => {
      if (category.checked) {
        return category.id
      }
    }))
    return data;
  }

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const projectData = compileProject();
    // for (var pair of projectData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    const res = await createProject(projectData);
    setProjects(prev => ([...prev, res]))
  }

  const handleProjectDelete = async (id) => {
    await destroyProject(id);
    setProjects(prev => ([
      prev.filter(project => (
        project.id !== id
      ))
    ]))
  }

  const [categories, setCategories] = useState([])

  const [categoryFormData, setCategoryFormData] = useState({
    name: ''
  })

  const callCategories = async () => {
    let res = await getCategories();
    setCategories(res);
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
    setCategories(prev => ([...prev, res]))
    setProjectFormData(prev => ({
      ...prev,
      categories: [...prev.categories, {
        name: res.name,
        id: res.id,
        checked: false
      }]
    }))
  }

  // const [skillFormData, setSkillFormData] = useState({
  //   name: ''
  // })

  useEffect(() => {
    checkUser();
    callProjects();
    callCategories();

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
          handleProjectFormDataCategoriesChange={handleProjectFormDataCategoriesChange}
          handleCategoryFormDataChange={handleCategoryFormDataChange}
          projectFormData={projectFormData}
          handleProjectSubmit={handleProjectSubmit}
          categories={categories}
          categoryFormData={categoryFormData}
          handleCategorySubmit={handleCategorySubmit}
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