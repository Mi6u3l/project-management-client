import React from 'react';
import { addProject, uploadFile } from '../api';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable'
import Dropzone from 'react-dropzone'

class AddProject extends React.Component {

   // const nameRef = React.useRef();
   // const descriptionRef = React.useRef();
    state = {
        title: '',
        description: '',
        imageUrl: 'http://some',
        options: [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
          ],
        selectedOption: '',
        selectedValue: '',
        selectedFiles: []
    }

    handleChange = (event) => {
        let { name, value } = event.target;

        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { title, description, imageUrl, selectedFiles } = this.state;
        const uploadData = new FormData();
        uploadData.append('file', imageUrl);

        uploadFile(uploadData).then((response) => {
            const newProject = {
                title: title,
                description: description,
                imageUrl: response.data.fileUrl
            }

            addProject(newProject).then(() => {
                toast.success('Project created!');
                this.props.history.push('/projects');
            });
        })
    }

    handleFileChange = (event) => {
        console.log(event.target.files[0]);
        this.setState({
            imageUrl: event.target.files[0]
        });
    }


    // handleChange = selectedOption => {
    //     this.setState({ selectedOption });
    //     console.log(`Option selected:`, selectedOption);
    //   };

    render() {
        const { title, description } = this.state; 
     
        return (
            <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
                <label>Title</label>
                <input type="text" name="title" value={title} onChange={this.handleChange} />

                <label>Description</label>
                <input type="text" name="description" value={description} onChange={this.handleChange}  />

                <label>Image</label>
                <input type="file" onChange={this.handleFileChange} />

                <CreatableSelect 
                    value={this.state.selectedOption}
                    onChange={this.handleChange}
                    options={this.state.options} />
                

                <Dropzone onDrop={((acceptedFiles) => 
                        this.setState({
                            selectedFiles: acceptedFiles   
                        })
                    )}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        </section>
                    )}
                </Dropzone>
                <button type="submit">Create</button>
            </form>
        )
    }

}

export default AddProject;