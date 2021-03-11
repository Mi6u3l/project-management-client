import { useState, useEffect } from 'react';
import { getProject, deleteProject } from '../api';

export const ProjectDetails = ({ match, history }) => {
   const [project, setProject] = useState()
   
   useEffect(() => {
    getProject(match.params.id).then((response) => {
        setProject(response.data)
    })
   }, [match.params.id]);


    const handleDeleteProject = () => {
        deleteProject(match.params.id).then(() => {
            //redirect the user /projects
            history.push('/projects');
        });
    }

    return project ? (
        <>
            <h2>{project.title}</h2>
            <h3>{project.description}</h3>
            <button onClick={handleDeleteProject}>Delete</button> 
            <button onClick={() => { history.push(`/projects/${project._id}/edit`) }}>Edit Project</button>
        </>
    ): <div>Loading...</div>
}