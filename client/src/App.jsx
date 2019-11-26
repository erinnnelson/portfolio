import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Main from './components/Main'
import { loginUser, registerUser, getProjects, destroyProject } from './services/api-helper'
import Login from './components/Login'
// import Register from './components/Register'
import decode from 'jwt-decode';

import './App.css';

function App(props) {

  const [currentUser, setCurrentUser] = useState(null)
  const [authFormData, setAuthFormData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const checkUser = () => {
    const userItem = localStorage.getItem("jwt");
    if (userItem) {
      const user = decode(userItem);
      setCurrentUser(user);
      console.log(user)
    }
  }

  const [projects, setProjects] = useState([])

  const callProjects = async () => {
    let res = await getProjects();
    console.log(res);
    setProjects(res);
  }

  useEffect(() => {
    checkUser();
    callProjects();

  }, [])

  const handleProjectDelete = async (id) => {
    let res = await destroyProject(id);
    console.log(res)
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
    setAuthFormData(prevAuthFormData => ({
      ...prevAuthFormData,
      [name]: value
    }))
  }



  // newTeacher = async (e) => {
  //   e.preventDefault();
  //   const teacher = await createTeacher(this.state.teacherForm);
  //   this.setState(prevState => ({
  //     teachers: [...prevState.teachers, teacher],
  //     teacherForm: {
  //       name: "",
  //       photo: ""
  //     }
  //   }))
  // }

  // editTeacher = async () => {
  //   const { teacherForm } = this.state
  //   await updateTeacher(teacherForm.id, teacherForm);
  //   this.setState(prevState => (
  //     {
  //       teachers: prevState.teachers.map(teacher => teacher.id === teacherForm.id ? teacherForm : teacher),
  //     }
  //   ))
  // }

  // deleteTeacher = async (id) => {
  //   await destroyTeacher(id);
  //   this.setState(prevState => ({
  //     teachers: prevState.teachers.filter(teacher => teacher.id !== id)
  //   }))
  // }

  // handleFormChange = (e) => {
  //   const { name, value } = e.target;
  //   this.setState(prevState => ({
  //     teacherForm: {
  //       ...prevState.teacherForm,
  //       [name]: value
  //     }
  //   }))
  // }

  // mountEditForm = async (id) => {
  //   const teachers = await readAllTeachers();
  //   const teacher = teachers.find(el => el.id === parseInt(id));
  //   this.setState({
  //     teacherForm: teacher
  //   });
  // }

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


      {/* <header>
        <h1>
          <Link to='/' onClick={() => this.setState({
          teacherForm: {
            name: "",
            photo: ""
          }
          })}>School App</Link>
        </h1>

      </header> */}
      <Route exact path="/" render={() => (
        <Main
          currentUser={currentUser}
          handleLogout={handleLogout}
          projects={projects}
          handleProjectDelete={handleProjectDelete}
        />
      )} />

      <Route exact path="/admin" render={() => (
        <Login
          handleLogin={handleLogin}
          handleChange={authHandleChange}
          formData={authFormData}
        />
        // <div>
        //   {currentUser
        //     ?
        //     <>
        //       <p>{currentUser.username}</p>
        //       <button onClick={handleLogout}>logout</button>
        //       <p>Current Projects</p>
        //     </>
        //     :
        //     <Login
        //       handleLogin={handleLogin}
        //       handleChange={authHandleChange}
        //       formData={authFormData}
        //     />
        //   }
        // </div>
      )} />
      {/* <Route exact path="/register" render={() => (
        <Register
          handleRegister={handleRegister}
          handleChange={authHandleChange}
          formData={authFormData} />)} /> */}
      {/* <Route
        exact path="/"
        render={() => (
          <TeachersView
            teachers={this.state.teachers}
            teacherForm={this.state.teacherForm}
            handleFormChange={this.handleFormChange}
            newTeacher={this.newTeacher} />
        )}
      /> */}
      {/* <Route
          path="/new/teacher"
          render={() => (
            <CreateTeacher
              handleFormChange={this.handleFormChange}
              teacherForm={this.state.teacherForm}
              newTeacher={this.newTeacher} />
          )} /> */}
    </div>
  );
}

export default withRouter(App);