import React from 'react';
import { updateProject, getProject } from '../api';

class EditProject extends React.Component {
    state = {
        title: '',
        description: ''
    }


    // React.useEffect(() => {
    //    const projectId = this.props.match.params.id;
    //     getProject(projectId).then((response) => {
    //         setProject(response.data)
    //     });

    // }, []);

    componentDidMount() {
        const projectId = this.props.match.params.id;
        getProject(projectId).then((response) => {
            this.setState({
                id: response.data._id,
                title: response.data.title,
                description: response.data.description
            })
        })
    }

    handleChange = (event) => {
        let { name, value } = event.target;

        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = (event) => {
        const { id } = this.state;
        event.preventDefault();
        updateProject(this.state).then(() => {
            this.props.history.push(`/projects/${id}`);
        });
    }

    render() {
        const { title, description } = this.state; 
        return (
            <form onSubmit={this.handleFormSubmit}>
                <label>Title</label>
                <input type="text" name="title" value={title} onChange={this.handleChange} />

                <label>Description</label>
                <input type="text" name="description" value={description} onChange={this.handleChange}  />

                <button type="submit">Update</button>
            </form>
        )
    }
}

export default EditProject