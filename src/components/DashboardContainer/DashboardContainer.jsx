import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './DashboardContainer.scss';
import Sidebar from './SideBar';
import Navbar from './Navbar';

const DashboardContainer = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [allNotes, setAllNotes] = useState([]);

    useEffect(() => {
        // console.log("Sidebar collapsed state changed: ", isCollapsed);
    }, [isCollapsed]);

    const toggleSidebar = () => {
        // console.log("Is Collapsed Before: ", isCollapsed);
        setIsCollapsed(prev => !prev);
    };

    return (
        <div className='dashboard-main-body'>
            <Navbar toggleSidebar={toggleSidebar} allNotes={allNotes || []} />
            <div className='dashboard-main-center'>
                <Sidebar isCollapsed={isCollapsed} />
                <div className='main-content'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default DashboardContainer;
