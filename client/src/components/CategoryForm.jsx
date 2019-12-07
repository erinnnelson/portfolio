import React, { useState } from 'react';


export default (props) => {

  return (
    <div>
      <input
        name='name'
        type='text'
        placeholder='Add Category?'
        autoComplete='off'
        value={props.categoryFormData.name}
        onChange={props.handleChange}
      />
      <button onClick={props.handleSubmit}>add</button>
    </div>
  )
}