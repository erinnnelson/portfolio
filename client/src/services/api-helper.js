import axios from 'axios';

const baseUrl = 'http://localhost:3000'

const api = axios.create({
  baseURL: baseUrl
})

export const loginUser = async(loginData) => {
  const resp = await api.post('/auth/login', loginData)
  return resp.data
}

export const registerUser = async(registerData) => {
  const resp = await api.post('/users/', {user: registerData})
  return resp.data
}

export const createProject = async(data) => {
  const resp = await api.post('/projects', data)
  return resp.data
}

export const getProjects = async() => {
  const resp = await api.get('/projects')
  return resp.data
}

export const updateProject = async(id, data) => {
  const resp = await api.put(`/projects/${id}`, data)
  return resp.data
}

export const destroyProject = async (id) => {
  const resp = await api.delete(`/projects/${id}`)
  return resp.data
}