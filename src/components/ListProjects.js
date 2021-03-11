import { useState, useEffect, useRef } from 'react';
import { getAllProjects, deleteProject } from '../api';
import { Link } from 'react-router-dom';
import { Ul, Image } from '../styles/list';
import { DeleteProject } from './DeleteProject';
import socketIOClient from "socket.io-client";

export const ListProjects = () => {
    
    const [projects, setProjects] = useState([]);
    const isMountedRef = useRef(null);

    useEffect(() => {
        isMountedRef.current = true;
        getAllProjects().then((response) => {
            setProjects(response.data);
        });

        const socket = socketIOClient(process.env.REACT_APP_PROJECTS_API);
        socket.on("newProject", (newProject) => {
            if (isMountedRef.current) {
                setProjects((projects) => {
                    return projects.concat(newProject)
                })
            }
        });
        return () => isMountedRef.current = false;
    }, []);
 
    const setProjectToDelete = (id) => {
        setProjects((projects) => {         
            return projects.map(
                project => project._id === id 
                ? {...project, beingDeleted: true} 
                : project
            )

        })
    }

    const setProjectToNotDelete = (id) => {
        setProjects((projects) => { 
            return projects.map(
                project => project._id === id 
                ? {...project, beingDeleted: false} 
                : project
            )
        })
    }

    const handleDeleteProject = (id) => {
        deleteProject(id).then(() => {
            setProjects((projects) => {      
                return projects.filter(project => project._id !== id)
            })
        })
    }
        
    return (
        <Ul primary>    
            {projects.map((project) => {
                return (
                    <li 
                    key={project._id}>
                        <div style={{ display : project.beingDeleted ? 'none' : 'block' }}>
                            <Link to={`/projects/${project._id}`}>
                            {project.title}
                            <Image src={project.imageUrl} />
                            </Link>
                            <DeleteProject 
                            softDelete={setProjectToDelete}
                            undoDelete={setProjectToNotDelete}
                            hardDelete={handleDeleteProject}
                            id={project._id} 
                            />
                        </div>
                    </li>

                )
            })}
        </Ul>
    )
}