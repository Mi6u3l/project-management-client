import { useRef } from 'react';
import { toast } from 'react-toastify';

export const DeleteProject = ({ id, hardDelete, softDelete, undoDelete }) => {
    let timeoutId;

    const handleDelete = () => {
      softDelete(id);
      
      timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);
        hardDelete(id);
      },  3000)
     
      toast.warning("Undo delete", {
          onClose: () => {
            undoDelete(id);
            clearTimeout(timeoutId);
          }
        })
    }

    useRef(()=> {
      return () => {
        clearTimeout(timeoutId);
      }
    }, [])
    
    return (
      <button onClick={handleDelete}>Delete</button>
    )
}