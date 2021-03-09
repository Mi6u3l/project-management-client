import axios from 'axios';
const baseURL = `${process.env.REACT_APP_PROJECTS_API}/api`;

/* PROJECT ROUTES */

export const getAllProjects = () => {
    return axios.get(`${baseURL}/projects`, {withCredentials: true});
}

export const getProject = (id) => {
    return axios.get(`${baseURL}/projects/${id}`);
}

export const addProject = (project) => {
    return axios.post(`${baseURL}/projects`, project);   
}

export const deleteProject = (id) => {
    return axios.delete(`${baseURL}/projects/${id}`);
}

export const updateProject = (updatedProject) => {
    return axios.put(`${baseURL}/projects/${updatedProject.id}`, updatedProject);
}

export const uploadFile = (uploadData) =>  {
    return axios.post(`${baseURL}/upload`, uploadData)
}


/* AUTHENTICATION ROUTES */

export const signup = (username, email,  password) => {
    return axios.post(`${baseURL}/signup`, {username, email, password})
}

export const login = (username, password) => {
    return axios.post(`${baseURL}/login`, {username, password}, {withCredentials: true})
}

export const logout = () => {
    return axios.post(`${baseURL}/logout`, null, {withCredentials: true});
}

export const loggedin = () => {
    return axios.get(`${baseURL}/loggedin`, {withCredentials: true});
}

