import React, { useContext, useEffect, useMemo, useState } from 'react';
import { getNotesApiCall } from '../../utils/api';
import NoteCard from '../NoteCard/NoteCard';
import './NotesContainer.scss';
import AddNote from '../AddNote/AddNote';
import { SearchContext } from "../../context/SearchContext";
import Masonry from 'react-layout-masonry';

const NotesContainer = () => {
    const [notes, setNotes] = useState([]);
    const { searchTerm } = useContext(SearchContext);

    useEffect(() => {
        getNotesApiCall()
            .then((response) => {
                let normalNotes = (response?.data?.data?.data || []).filter((note) =>
                    !note.isArchived && !note.isDeleted
                );
                setNotes(normalNotes.reverse());

                if (response.status !== 200) {
                    throw new Error(response?.data?.message);
                }
            })
            .catch((error) => console.error("Error fetching notes:", error));
    }, []);

    const filteredNotes = useMemo(() => {
        if (!searchTerm || !searchTerm.trim()) return notes;
        return notes.filter((note) =>
            note.title.toLowerCase().includes(searchTerm) || note.description.toLowerCase().includes(searchTerm)
        );
    }, [searchTerm, notes]);

    const updateNoteList = (response) => {
        const { action, data } = response;
        if (action === 'add') {
            setNotes([{ title: data.title, description: data.description, id: data.id }, ...notes]);
        } else if (action === 'archive' || action === 'trash') {
            setNotes(notes.filter((note) => note.id !== data.id));
        } else if (action === 'edit') {
            setNotes(notes.map((note) => (note.id === data.id ? data : note)));
        } else if (action === "reminder") {
            setNotes(notes.map((note) =>
                note.id === data.id ? { ...note, reminder: [data.reminder] } : note
            ));
        } else if (action === "removeReminder") {
            setNotes(notes.map((note) =>
                note.id === data.noteDetails.id ? { ...note, reminder: [] } : note
            ));
        }
    };

    return (
        <div className='notes-container'>
            <div className='notes-addnote-component'>
                <AddNote updateList={updateNoteList} />
            </div>
            <div className='notes-main-container'>
                <Masonry
                    columns={{ 480: 1, 768: 2, 1024: 3, 1280: 4 }}
                    gap={5}
                    className="masonry-grid"
                    columnClassName="masonry-column"
                >
                    {filteredNotes.map((note) => (
                        <NoteCard
                            key={note.id}
                            title={note.title}
                            description={note.description}
                            noteDetails={note}
                            updateList={updateNoteList}
                        />
                    ))}
                </Masonry>

            </div>
        </div>
    );
};

export default NotesContainer;
