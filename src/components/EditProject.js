import { useRef, useEffect } from 'react';
import { updateProject, getProject } from '../api';

export const EditProject = ({ match, history }) => {
    const titleRef = useRef();
    const descriptionRef = useRef();
   
   useEffect(() => {
        getProject(match.params.id).then((response) => {
            titleRef.current.value = response.data.title;
            descriptionRef.current.value = response.data.description;
        })
     }, [match.params.id]);


    const handleFormSubmit = (event) => {
        event.preventDefault();
        const projectUpdated = {
            id: match.params.id,
            title: titleRef.current.value,
            description: descriptionRef.current.value
        }
        updateProject(projectUpdated).then(() => {
            history.push(`/projects/${match.params.id}`);
        });
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <label>Title</label>
            <input type="text" ref={titleRef}  />

            <label>Description</label>
            <input type="text" ref={descriptionRef} />

            <button type="submit">Update</button>
        </form>
    )
}