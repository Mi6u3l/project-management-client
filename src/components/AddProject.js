import React, { useRef, useState } from 'react';
import { addProject, uploadFile } from '../api';
import { toast } from 'react-toastify';
import Dropzone from 'react-dropzone'

export const AddProject = ({ history }) => {
    const titleRef = useRef();
    const descriptionRef = useRef();
    
    const [imageUrl, setImageUrl] = useState();
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const uploadData = new FormData();
        uploadData.append('file', imageUrl);

        uploadFile(uploadData).then((response) => {
            const newProject = {
                title: titleRef.current.value,
                description: descriptionRef.current.value,
                imageUrl: response.data.fileUrl
            }

            addProject(newProject).then(() => {
                toast.success('Project created!');
                history.push('/projects');
            });
        })
    }
      
    return (
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <label>Title</label>
            <input type="text" ref={titleRef} />

            <label>Description</label>
            <input type="text" ref={descriptionRef} />

            <label>Image</label>
            <input type="file" onChange={(e) => {
                setImageUrl(e.target.files[0])
            }} />            

            <Dropzone onDrop={((acceptedFiles) => 
                    setSelectedFiles(acceptedFiles)
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
            <ul>
            {selectedFiles.map((file, index) => {
                return (
                    <li key={index}>
                        {file.name}
                    </li>
                )
            })}
            </ul>
            <button type="submit">Create</button>
        </form>
    )
}