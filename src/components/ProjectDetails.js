import React from 'react';
import { getProject, deleteProject } from '../api';
import { LoggedUserConsumer } from '../context/loggedUser';

class ProjectDetails extends React.Component {
    state = {
        id: '',
        title: '',
        description: ''
    }

    componentDidMount() {
       const projectId = this.props.match.params.id;
       getProject(projectId).then((response) => {
        this.setState({
            id: response.data._id,
            title: response.data.title,
            description: response.data.description
        })
       });
    }

    handleDeleteProject = (id) => {
        deleteProject(id).then(() => {
            //redirect the user /projects
            this.props.history.push('/projects');
        });
    }

    render() {
        const { id, title, description } = this.state;
        return title ? (
            <>
                <LoggedUserConsumer>
                    {({ loggedInUser }) => (
                        <div>
                            <p>{loggedInUser && loggedInUser.username}</p>
                        </div>
                    )}
                </LoggedUserConsumer>
                <h2>{title}</h2>
                <h3>{description}</h3>
                <button onClick={() => this.handleDeleteProject(id)}>Delete</button> 
                <button onClick={() => {
                    this.props.history.push(`/projects/${id}/edit`);
                }}>Edit Project</button>
            </>
        ): <div>Loading...</div>
    }
}

export default ProjectDetails;