import React from 'react';
import { toast } from 'react-toastify';

class DeleteProject extends React.Component {
    state = {
        timeoutId: null
    }

    handleDelete = (id) => {
      const { hardDelete, softDelete } = this.props;
      softDelete(id);
      
      this.state.timeoutId = setTimeout(() => {
        clearTimeout(this.state.timeoutId);
        hardDelete(id);
      }, 3000);
      toast.warning("Undo delete", {
          onClose: () => this.undoDelete()
        })
    }
    
    componentWillUnmount() {
      clearTimeout(this.state.timeoutId);
    }

    undoDelete = () => {
      const { id, undoDelete } = this.props;
      undoDelete(id);
      clearTimeout(this.state.timeoutId);
    }

    render() {
      return (
        <button onClick={() => this.handleDelete(this.props.id)}>Delete</button>
      )
    }
}

export default DeleteProject;