import React, { useState } from 'react';
import './NoteCard.scss';
import { BellPlus, UserPlus, Image, FolderDown, ArchiveRestore, Trash2, Palette } from 'lucide-react';
import LongMenu from './LongMenu';
import { archiveNoteApi, deleteNoteForeverApi, trashNoteApi, colorAPI } from '../../utils/api';
import Modal from '@mui/material/Modal';
import AddNote from '../AddNote/AddNote';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const MAX_DESCRIPTION_LENGTH = 200;

const NoteCard = ({ title, description = "", noteDetails, updateList }) => {
    const navigate = useNavigate();
    const { noteId } = useParams();
    const location=useLocation().pathname.split("/")[2];

    const [editNote, setEditNote] = useState(noteId === noteDetails.id);
    const [showColors, setShowColors] = useState(false);
    const [selectedColor, setSelectedColor] = useState(noteDetails?.color || '#FFFFFF');

    const colorMap = [
        "#FFFFFF", "#FAAFA8", "#F39F76", "#FFF8B8",
        "#E2F6D3", "#B4DDD3", "#D4E4ED", "#AECCDC",
        "#D3BFDB", "#F6E2DD", "#E9E3D4", "#EFEFF1"
    ];

    const isLongDescription = description.length > MAX_DESCRIPTION_LENGTH;
    const truncatedDescription = isLongDescription
        ? description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
        : description;

    const handleIconClick = async (action, data = null) => {
        try {
            if (action === 'archive') {
                await archiveNoteApi({ "noteIdList": [`${noteDetails.id}`], "isArchived": !noteDetails.isArchived });
                updateList({ action: "archive", data: { ...noteDetails, isArchived: !noteDetails.isArchived } });
            } else if (action === 'trash') {
                let response = await trashNoteApi({ "noteIdList": [`${noteDetails.id}`], "isDeleted": !noteDetails.isDeleted });
                if (response.status === 200) {
                    updateList({ action: "trash", data: { ...noteDetails, isDeleted: !noteDetails.isDeleted } });
                }
            } else if (action === 'deleteForever') {
                let response = await deleteNoteForeverApi({ "noteIdList": [`${noteDetails.id}`] });
                updateList({ action: "deleteForever", data: { ...noteDetails, isDeleted: true } });
            }
        } catch (error) {
            console.error("Error performing action:", error);
        }
        if (action === 'edit') {
            setEditNote(false);
            updateList({ action, data });
        }
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color);
        setShowColors(false);
        colorAPI({ "noteIdList": [`${noteDetails.id}`], color: color })
            .then(() => {
                updateList({ action: 'edit', data: { ...noteDetails, color } });
            })
            .catch((error) => {
                console.error("Error updating color:", error);
            });
    };

    const handleNavigate=()=>{
        if(location==='notes'){
            navigate(`/dashboard/notes/${noteDetails.id}`)
        }
        else if(location==='archive'){
            navigate(`/dashboard/archive/${noteDetails.id}`)
        }
    }

    const handleCloseNavigate=()=>{
        if(location==='notes'){
            navigate(`/dashboard/notes`)
        }
        else if(location==='archive'){
            navigate(`/dashboard/archive`)
        }
    }

    return (
        <div className="note-card-main-container" style={{ backgroundColor: selectedColor }}>
            <div className="card-container-info" onClick={() => {
                setEditNote(true);
                handleNavigate();
            }}>
                <h3 className="card-title">{title}</h3>
                <p className="card-desc">{truncatedDescription}</p>
            </div>
            <div className="card-container-options">
                {noteDetails?.isDeleted ? (
                    <>
                        <ArchiveRestore onClick={() => handleIconClick('trash')} className="icons" />
                        <Trash2 onClick={() => handleIconClick('deleteForever')} className="icons" />
                    </>
                ) : (
                    <>
                        <BellPlus className="icons" />
                        <UserPlus className="icons" />
                        <Image className="icons" />
                        <div className="bgcolor-container">
                            <Palette className="icons pallete-icon" onClick={() => setShowColors(!showColors)} />
                            {showColors && (
                                <div className="color-picker">
                                    {colorMap.map((color) => (
                                        <div
                                            key={color}
                                            className="color-option"
                                            style={{ backgroundColor: color }}
                                            onClick={() => handleColorSelect(color)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        <FolderDown onClick={() => handleIconClick('archive')} className="icons" />
                        <LongMenu handleIconClick={handleIconClick} className="icons menu-icon" />
                    </>
                )}
            </div>
            <Modal
                sx={{ marginTop: "40vh" }}
                open={editNote}
                onClose={() => {
                    setEditNote(false);
                    handleCloseNavigate()
                }}
                className="editNotecard-extended"
            >
                <AddNote expanded={true} noteDetails={noteDetails} updateList={handleIconClick} />
            </Modal>
        </div>
    );
};

export default NoteCard;
