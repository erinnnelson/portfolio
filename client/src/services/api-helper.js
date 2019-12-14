import axios from 'axios';

export const baseUrl = 'http://localhost:3000'

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

export const getCategories = async() => {
  const resp = await api.get('/categories')
  return resp.data
}

export const createCategory = async(data) => {
  const resp = await api.post('/categories', data)
  return resp.data
}

export const updateCategory = async(id, data) => {
  const resp = await api.put(`/categories/${id}`, data)
  return resp.data
}

export const destroyCategory = async (id) => {
  const resp = await api.delete(`/categories/${id}`)
  return resp.data
}

export const getSkills = async() => {
  const resp = await api.get('/skills')
  return resp.data
}

export const createSkill = async(data) => {
  const resp = await api.post('/skills', data)
  return resp.data
}

export const updateSkill = async(id, data) => {
  const resp = await api.put(`/skills/${id}`, data)
  return resp.data
}

export const destroySkill = async (id) => {
  const resp = await api.delete(`/skills/${id}`)
  return resp.data
}