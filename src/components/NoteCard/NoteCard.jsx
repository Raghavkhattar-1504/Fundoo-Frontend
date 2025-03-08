import React, { useState } from 'react';
import './NoteCard.scss';
import { BellPlus, UserPlus, Image, FolderDown, ArchiveRestore, Trash2, Palette, Clock7, X } from 'lucide-react';
import LongMenu from './LongMenu';
import ReminderIcon from './ReminderIcon'
import { archiveNoteApi, deleteNoteForeverApi, trashNoteApi, colorAPI, reminderAPI, removeReminderAPI } from '../../utils/api';
import Modal from '@mui/material/Modal';
import AddNote from '../AddNote/AddNote';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

let MAX_DESCRIPTION_LENGTH = 250;
let MAX_TITLE_LENGTH = 100;

const NoteCard = ({ title, description = "", noteDetails, updateList }) => {
    // noteDetails.reminder ? MAX_DESCRIPTION_LENGTH = 50 : MAX_DESCRIPTION_LENGTH = 130

    const navigate = useNavigate();
    const { noteId } = useParams();
    const location = useLocation().pathname.split("/")[2];

    const [editNote, setEditNote] = useState(noteId === noteDetails.id);
    const [showColors, setShowColors] = useState(false);
    const [selectedColor, setSelectedColor] = useState(noteDetails?.color || '#FFFFFF');

    const colorMap = [
        "#FFFFFF", "#FAAFA8", "#F39F76", "#FFF8B8",
        "#E2F6D3", "#B4DDD3", "#D4E4ED", "#AECCDC",
        "#D3BFDB", "#F6E2DD", "#E9E3D4", "#EFEFF1"
    ];

    const isLongDescription = description.length > MAX_DESCRIPTION_LENGTH;
    const isLongTitle = title.length > MAX_TITLE_LENGTH;
    const truncatedDescription = isLongDescription
        ? description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
        : description;
    const truncatedTitle = isLongTitle
        ? title.substring(0, MAX_TITLE_LENGTH) + "..."
        : title;

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
            else if (action === 'reminder') {
                let response = await reminderAPI({ "noteIdList": [`${noteDetails.id}`], reminder: data })
                updateList({ action: "reminder", data: { ...noteDetails, reminder: data } })
            }
            else if (action === 'removeReminder') {
                let response = await removeReminderAPI({ "noteIdList": [`${noteDetails.id}`] })
                updateList({ action: "removeReminder", data: { noteDetails } })
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

    const handleNavigate = () => {
        if (location === 'notes') {
            navigate(`/dashboard/notes/${noteDetails.id}`)
        }
        else if (location === 'archive') {
            navigate(`/dashboard/archive/${noteDetails.id}`)
        }
    }

    const handleCloseNavigate = () => {
        if (location === 'notes') {
            navigate(`/dashboard/notes`)
        }
        else if (location === 'archive') {
            navigate(`/dashboard/archive`)
        }
    }

    const reminderData = noteDetails.reminder.toString().substring(4, 21);
    return (
        <div className="note-card-main-container" style={{ backgroundColor: selectedColor }}>
            <div className="card-container-info" onClick={() => {
                setEditNote(true);
                handleNavigate();
            }}>
                <h3 className="card-title">{truncatedTitle}</h3>
                <p className="card-desc">{truncatedDescription}</p>
            </div>

            <div
                className="reminder-container"
                style={{
                    display: noteDetails.reminder.length > 0 ? "flex" : "none",
                    alignItems: "center",
                    gap: "5px",
                    backgroundColor: "#f5f5f5",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    fontSize: "11px",
                    fontWeight: "500",
                    color: "#333",
                    position: "relative",
                    transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                    const closeIcon = e.currentTarget.querySelector(".close-icon");
                    if (closeIcon) closeIcon.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                    const closeIcon = e.currentTarget.querySelector(".close-icon");
                    if (closeIcon) closeIcon.style.opacity = "0";
                }}
            >
                <Clock7 style={{ color: "#555", width: "14px", height: "14px" }} />
                <span>{noteDetails.reminder.length > 0 ? reminderData : null}</span>
                <X
                    className="close-icon"
                    style={{
                        opacity: "0",
                        cursor: "pointer",
                        color: "#555",
                        transition: "opacity 0.3s ease, color 0.3s ease",
                        width: "14px",
                        height: "14px",
                    }}
                    onMouseOver={(e) => (e.target.style.color = "#d63031")}
                    onMouseOut={(e) => (e.target.style.color = "#555")}
                    onClick={() => handleIconClick('removeReminder')}
                />
            </div>



            <div className="card-container-options">
                {noteDetails?.isDeleted ? (
                    <>
                        <ArchiveRestore onClick={() => handleIconClick('trash')} className="icons" />
                        <Trash2 onClick={() => handleIconClick('deleteForever')} className="icons" />
                    </>
                ) : (
                    <>
                        <ReminderIcon handleIconClick={handleIconClick} noteDetails={noteDetails} />
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
                        <LongMenu handleIconClick={handleIconClick} className="icons menu-icon" noteDetails={noteDetails} />
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
