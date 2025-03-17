import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './LongMenu.scss';
import NoteCard from './NoteCard';
import { BellPlus } from 'lucide-react';

export default function LongMenu({ handleIconClick, noteDetails }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [date, setDate] = React.useState('');
    const [time, setTime] = React.useState('');

    const reminderData = (date, time) => {
        const isoString = new Date(`${date}T${time}:00`);
        handleIconClick("reminder", isoString);

        handleClose();
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        <div>
            <BellPlus
                className='icons'
                onClick={handleClick}
                aria-controls={open ? 'long-menu' : undefined}
                aria-haspopup="true"
            />

            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                disableScrollLock={true}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                slotProps={{
                    paper: {
                        style: {
                            width: '280px',
                            overflow: 'visible',
                            borderRadius: '12px',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                            padding: '10px',
                            backgroundColor: '#fff',
                        },
                    },
                }}
            >
                <MenuItem
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        padding: '8px 15px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#333',
                    }}
                >
                    <label style={{ fontSize: '13px', color: '#666', marginBottom: '5px' }}>Select Date</label>
                    <input
                        type="date"
                        style={{
                            border: '1px solid #ddd',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            fontSize: '14px',
                            outline: 'none',
                            cursor: 'pointer',
                            backgroundColor: '#f9f9f9',
                            width: '100%',
                            transition: 'border 0.2s ease',
                        }}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setDate(e.target.value)}
                        onFocus={(e) => (e.target.style.border = '1px solid #555')}
                        onBlur={(e) => (e.target.style.border = '1px solid #ddd')}
                    />
                </MenuItem>
                <MenuItem
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        padding: '8px 15px',
                    }}
                >
                    <label style={{ fontSize: '13px', color: '#666', marginBottom: '5px' }}>Select Time</label>
                    <input
                        type="time"
                        style={{
                            border: '1px solid #ddd',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            fontSize: '14px',
                            outline: 'none',
                            cursor: 'pointer',
                            backgroundColor: '#f9f9f9',
                            width: '100%',
                            transition: 'border 0.2s ease',
                        }}
                        onChange={(e) => setTime(e.target.value)}
                        onFocus={(e) => (e.target.style.border = '1px solid #555')}
                        onBlur={(e) => (e.target.style.border = '1px solid #ddd')}
                    />
                </MenuItem>

                <MenuItem
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px',
                    }}
                >
                    <button
                        onClick={() => {
                            const now = new Date();
                            const selectedDateTime = new Date(`${date}T${time}`);
                            if (selectedDateTime < now) {
                                alert('Please select a future date and time.');
                                return;
                            }
                            reminderData(date, time);
                        }}
                        style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'background 0.3s ease',
                            fontWeight: '500',
                            fontSize: '14px',
                            width: '100%',
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
                        onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
                    >
                        SAVE
                    </button>
                </MenuItem>
            </Menu>
        </div>
    );
}