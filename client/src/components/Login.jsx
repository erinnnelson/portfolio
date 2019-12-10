import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';


// This component handles our login form and has a link to the register form
function Login(props) {
  props.currentUser && props.history.push('/')

  return (
    <div className="auth-container">
      <h2>login</h2>
      <hr />
      <form onSubmit={(e) => {
        e.preventDefault();
        props.handleLogin();}} >
        <p>Username:</p>
        <input name="username" type="text" value={props.formData.username} onChange={props.handleChange} />
        <p>Password:</p>
        <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
        <hr/>
        <button>Login</button>
        {/* <Link to="/register">Register</Link> */}
      </form>
    </div>
  );
}

export default withRouter(Login);;