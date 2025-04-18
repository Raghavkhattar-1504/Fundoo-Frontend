import React, { useContext, useEffect, useState } from 'react';
import './Navbar.scss';
import { Menu, RotateCw, Settings, Rows2, Grip, Search } from "lucide-react";
import AccountMenu from './AccountMenu';
import { useLocation } from 'react-router-dom';
import { SearchContext } from "../../context/SearchContext.jsx";
import Tooltip from '@mui/material/Tooltip';

function Navbar({ toggleSidebar, allNotes }) {
    const { searchTerm, setSearchTerm } = useContext(SearchContext)
    const [navTitle, setNavTitle] = useState("Keep");

    const page = useLocation();
    const path = page.pathname.split('/')[2];

    useEffect(() => {
        if (path === 'notes') {
            setNavTitle('Keep');
        } else if (path === 'archive') {
            setNavTitle('Archive');
        } else if (path === 'trash') {
            setNavTitle('Trash');
        } else if (path === 'reminder') {
            setNavTitle('Reminder');
        } else if (path === 'editlabel') {
            setNavTitle('Labels');
        }

    }, [path]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    };

    return (
        <div className='dashboard-header'>
            <div className='header-left'>
                <div className='dashboard-header-left-container'>
                    <div className='header-left-container-menu'>
                        <Tooltip title="Main menu">
                            <Menu className='header-icons' onClick={toggleSidebar} />
                        </Tooltip>
                    </div>
                    <div className='header-left-container-logo'>
                        <img src='https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png' alt='Logo' />
                    </div>
                    <div className='header-left-container-title'>{navTitle}</div>
                </div>
            </div>
            <div className='header-right'>
                <div className='dashboard-header-middle-container'>
                    <div className='header-middle-search-icon'>
                        <Tooltip title="Search">
                            <Search className='search-icon' />
                        </Tooltip>
                    </div>
                    <input
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e)}
                        className='header-middle-search-input'
                        type='text'
                        placeholder='Search notes...'
                    />
                </div>
                <div className='dashboard-header-right-container'>
                    <div className='header-right-container-icons'>
                        <Tooltip title="Refresh">
                            <div className='icon-div'><RotateCw className='header-icons' /></div>
                        </Tooltip>
                        <Tooltip title="List View">
                            <div className='icon-div row-icon'><Rows2 className='header-icons' /></div>
                        </Tooltip>
                        <Tooltip title="Settings">
                            <div className='icon-div'><Settings className='header-icons' /></div>
                        </Tooltip>
                    </div>
                    <div className='header-right-container-account'>
                        <Tooltip title="More Apps">
                            <div className='icon-div-account grid-icon'><Grip className='header-icons' /></div>
                        </Tooltip>
                        <div className='icon-div-account'>
                            <AccountMenu />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
