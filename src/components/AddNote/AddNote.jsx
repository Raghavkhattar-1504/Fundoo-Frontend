import React, { useState } from 'react'
import { addNoteApi, editNoteApi } from '../../utils/api';
import './AddNote.scss'
import ClosedAddNote from './ClosedAddNote';
import ExpandedAddNote from './ExpandedAddNote';

const AddNote = ({ updateList , expanded=false, noteDetails=null}) => {
    const [title, setTitle] = useState(
        noteDetails ? noteDetails.title : '');
    const [description, setDescription] = useState(
        noteDetails ? noteDetails.description : '')
    const [isExpanded, setIsExpanded] = useState(expanded);

    const handleAddNote = () => {
        if (isExpanded && (title || description) && !noteDetails) {

            addNoteApi({ title, description })
                .then((response) => {

                    if (response.status !== 200) {
                        throw new Error(response?.data?.message);
                    }
                    updateList({ action: "add", data: response.data.status.details });
                })
                .catch((error) => {
                    console.error("Error Adding Note:", error);
                });

            setTitle('');
            setDescription('');
        }
        if(noteDetails){
            editNoteApi({...noteDetails, title, description, noteId:noteDetails.id});
            updateList('edit', {...noteDetails, title, description});

        }

        setIsExpanded(prev => !prev);
    };

    return (
        <div className='addnote-main-container'>
            {isExpanded ?
                <ExpandedAddNote toggleView={handleAddNote} setFunctions={{ setTitle, setDescription }} value={{title, description}} />
                :
                <ClosedAddNote toggleView={handleAddNote} />
            }
        </div>
    )
}

export default AddNote