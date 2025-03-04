import React from 'react'
import './ExpandedAddNote.scss';
import { BellPlus, UserPlus, Image, FolderDown, EllipsisVertical } from 'lucide-react';
import { useRef } from 'react';
import { useEffect } from 'react';

function ExpandedAddNote({ toggleView, setFunctions, value }) {
   const noteHeightRef = useRef(null);

    const adjustHeight = () => {
        const text = noteHeightRef.current;
        if (text) {
            text.style.height = "auto";
            text.style.height = Math.min(text.scrollHeight, 20 * 24) + "px";
        }
    }

    useEffect(() => {
        adjustHeight();
    }, [value.description]);

    return (
        <div className='expended-main-container'>
            <div className='expended-title'>
                <input value={value.title} className='title' type='text' placeholder='Title' onChange={(e) => setFunctions.setTitle(e.target.value)} />
            </div>
            <div className='expended-note note'>
                <textarea
                    ref={noteHeightRef}
                    value={value.description}
                    className='note'
                    type='textarea'
                    placeholder='Take a Note...'
                    onChange={(e) => {
                        setFunctions.setDescription(e.target.value)
                        adjustHeight();
                    }}
                    style={{
                        width: "100%",
                        minHeight: "24px",
                        maxHeight: "480px",
                        overflowY: "auto",
                        resize: "none"
                    }}
                />
            </div>
            <div className='expended-options'>
                <div className='options-left'>
                    <BellPlus className='expended-icons' />
                    <UserPlus className='expended-icons' />
                    <Image className='expended-icons' />
                    <FolderDown className='expended-icons' />
                    <EllipsisVertical className='expended-icons' />
                </div>
                <div className='options-right'>
                    <p onClick={toggleView}>Close</p>
                </div>
            </div>
        </div>
    )
}

export default ExpandedAddNote