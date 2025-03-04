// import React, { useEffect, useState } from 'react';
// import { getNotesApiCall } from '../../utils/api';
// import NoteCard from '../NoteCard/NoteCard';
// import './NotesContainer.scss'
// import AddNote from '../AddNote/AddNote';
// // import { useSearchContext } from '../../context/SearchContext';
// import { SearchProvider, useSearchContext } from "../../context/SearchContext.jsx"; 


// const NotesContainer = () => {
//     const [notes, setNotes] = useState([]);
//     const {searchTerm, searchResults, setSearchResults}=useSearchContext();
//     console.log("SearchTerm Function: ", searchTerm);
//     useEffect(() => {
//         getNotesApiCall()
//             .then((response) => {
//                 let normalNotes = (response?.data?.data?.data || []).filter((note) => {
//                     return (!note.isArchived && !note.isDeleted);
//                 })
//                 setNotes(normalNotes.reverse());
//                 setSearchResults(notes);


//                 if (response.status !== 200) {
//                     throw new Error(response?.data?.message);
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error fetching notes:", error);
//             });
//     }, []);

//     const updateNoteList = (response) => {
//         const { action, data } = response;

//         if (action === 'add') {
//             setNotes([{ title: data.title, description: data.description, id: data.id }, ...notes]);
//         }
//         else if (action === 'archive' || action === 'trash') {
//             setNotes(notes.filter((note) => {
//                 return note.id !== data.id;
//             }))
//         }
//         else if(action=== 'edit'){
//             setNotes(notes.map((note) => {
//                 if(note.id === data.id){
//                     return data;
//                 }
//                 return note;
//             }
//             ))
//         }
//     }

//     return (
//         <div className='notes-container'>
//             <div className='notes-addnote-component'>
//                 <AddNote updateList={updateNoteList} />
//             </div>
//             <div className='notes-main-container'>
//                 {searchResults.map((note, index) => (
//                     <NoteCard
//                         key={note.id || index}
//                         title={note.title}
//                         description={note.description}
//                         noteDetails={note}
//                         updateList={updateNoteList}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default NotesContainer;


import React, { useContext, useEffect, useMemo, useState } from 'react';
import { getNotesApiCall } from '../../utils/api';
import NoteCard from '../NoteCard/NoteCard';
import './NotesContainer.scss';
import AddNote from '../AddNote/AddNote';
import { SearchContext } from "../../context/SearchContext";  
import { FileChartLine } from 'lucide-react';

const NotesContainer = () => {
    const [notes, setNotes] = useState([]);
    const {searchTerm} = useContext(SearchContext)

    // console.log("searchtem",searchTerm)

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

    // useEffect(() => {
    //     setSearchResults(notes);
    //     console.log("SearchResult Array: ", searchResults)
    // }, [notes, setSearchResults]); 

    const filteredNotes = useMemo(()=>{
        console.log("searchTerm",typeof searchTerm)
        if(!searchTerm || !searchTerm.trim()) return notes
        // console.log("notes",notes)
        return notes.filter((note) => note.title.toLowerCase().includes(searchTerm) || note.description.toLowerCase().includes(searchTerm))
    },[searchTerm,notes])

    console.log("filteredNotes",filteredNotes)

    const updateNoteList = (response) => {
        const { action, data } = response;
        if (action === 'add') {
            setNotes([{ title: data.title, description: data.description, id: data.id }, ...notes]);
        } else if (action === 'archive' || action === 'trash') {
            setNotes(notes.filter((note) => note.id !== data.id));
        } else if (action === 'edit') {
            setNotes(notes.map((note) => (note.id === data.id ? data : note)));
        }
    };

    return (
        <div className='notes-container'>
            <div className='notes-addnote-component'>
                <AddNote updateList={updateNoteList} />
            </div>
            <div className='notes-main-container'>
                {filteredNotes.map((note, index) => (
                    <NoteCard
                        key={note.id || index}
                        title={note.title}
                        description={note.description}
                        noteDetails={note}
                        updateList={updateNoteList}
                    />
                ))}
            </div>
        </div>
    );
};

export default NotesContainer;
