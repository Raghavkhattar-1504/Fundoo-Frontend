// import React, { useEffect, useState } from 'react'
// import './Navbar.scss';
// import { Menu, RotateCw, Settings, Rows2, Grip, Search } from "lucide-react";
// import AccountMenu from './AccountMenu';
// import { useLocation } from 'react-router-dom';
// import { SearchProvider, useSearchContext } from "../../context/SearchContext.jsx"; 

// function Navbar({ toggleSidebar }) {
//     const {searchTerm, setSearchTerm, searchResults, setSearchResults}=useSearchContext();
//         // console.log("SearchTerm Function: ", searchTerm);
//     const [navTitle, setNavtitle] = useState(['Keep']);
//     const page = useLocation();
//     const path = page.pathname.split('/')[2];
//     console.log(path);

//     const filterSearch=()=>{
//         if(searchTerm.length>0){
//             setSearchResults(searchResults.filter(item=>item.toLowerCase().includes(searchTerm.toLowerCase()))); 
//         }

//     }   

//     useEffect(() => {
//         if (path === 'notes') {
//             setNavtitle('Keep');
//         }
//         else if (path === 'archive') {
//             setNavtitle('Archive');
//         }
//         else if (path === 'trash') {
//             setNavtitle('Trash');
//         }
//     }, [path]);

//     return (
//         <div className='dashboard-header'>
//             <div className='header-left'>
//                 <div className='dashboard-header-left-container'>
//                     <div className='header-left-container-menu'>
//                         <Menu className='header-icons' onClick={toggleSidebar} />
//                     </div>
//                     <div className='header-left-container-logo'>
//                         <img src='https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png' alt='Image not Found' />
//                     </div>
//                     <div className='header-left-container-title'>{navTitle}</div>
//                 </div>
//             </div>
//             <div className='header-right'>
//                 <div className='dashboard-header-middle-container'>
//                     <div className='header-middle-search-icon'>
//                         <Search className='search-icon' />
//                     </div>
//                     <input onChange={(e)=>{
//                         setSearchTerm(e.target.value);
//                         filterSearch()
//                     }} className='header-middle-search-input' type='text' placeholder='Search' />
//                 </div>
//                 <div className='dashboard-header-right-container'>
//                     <div className='header-right-container-icons'>
//                         <div className='icon-div'><RotateCw className='header-icons' /></div>
//                         <div className='icon-div row-icon'><Rows2 className='header-icons' /></div>
//                         <div className='icon-div'><Settings className='header-icons' /></div>
//                     </div>
//                     <div className='header-right-container-account'>
//                         <div className='icon-div-account grid-icon'><Grip className='header-icons' /></div>
//                         <div className='icon-div-account'>
//                             <AccountMenu />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Navbar



import React, { useContext, useEffect, useState } from 'react';
import './Navbar.scss';
import { Menu, RotateCw, Settings, Rows2, Grip, Search } from "lucide-react";
import AccountMenu from './AccountMenu';
import { useLocation } from 'react-router-dom';
import { SearchContext } from "../../context/SearchContext.jsx"; 

function Navbar({ toggleSidebar, allNotes }) {
    const { searchTerm, setSearchTerm } = useContext(SearchContext)
    const [navTitle, setNavTitle] = useState("Keep"); // Fix for ReferenceError

    const page = useLocation();
    const path = page.pathname.split('/')[2];

    useEffect(() => {
        if (path === 'notes') {
            setNavTitle('Keep');
        } else if (path === 'archive') {
            setNavTitle('Archive');
        } else if (path === 'trash') {
            setNavTitle('Trash');
        } else if(path === 'reminder') {
            setNavTitle('Reminder');
        } else if(path === 'editlabel'){
            setNavTitle('Labels');
        }

    }, [path]);

    // Filter function to update search results
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
        // console.log("SearchTerm: ", searchTerm);
    };

    return (
        <div className='dashboard-header'>
            <div className='header-left'>
                <div className='dashboard-header-left-container'>
                    <div className='header-left-container-menu'>
                        <Menu className='header-icons' onClick={toggleSidebar} />
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
                        <Search className='search-icon' />
                    </div>
                    <input 
                        value={searchTerm}
                        onChange={(e)=>handleSearchChange(e)}
                        className='header-middle-search-input' 
                        type='text' 
                        placeholder='Search notes...' 
                    />
                </div>
                <div className='dashboard-header-right-container'>
                    <div className='header-right-container-icons'>
                        <div className='icon-div'><RotateCw className='header-icons' /></div>
                        <div className='icon-div row-icon'><Rows2 className='header-icons' /></div>
                        <div className='icon-div'><Settings className='header-icons' /></div>
                    </div>
                    <div className='header-right-container-account'>
                        <div className='icon-div-account grid-icon'><Grip className='header-icons' /></div>
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
