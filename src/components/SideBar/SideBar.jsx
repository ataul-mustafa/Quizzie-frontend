import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Style from './SideBar.module.css'
import { toast } from 'react-toastify';

const SideBar = ({changeToggle}) => {
    const navigate = useNavigate();
    const [currentNav, setCurrentNav] = useState('dashboard');

    const segments = (window.location.pathname).split('/');

    useEffect(() => {
        // Get the current pathname from the URL
        const firstSegment = segments[1];
        setCurrentNav(firstSegment)
    }, [segments]);

    //function to handle logout functionality
    const logoutHandler = () =>{
        localStorage.clear('authToken')
        navigate('/auth')
        toast.success('Logged out successfully')
    }

    return (
        <div className={Style.sideBarContainer}>
            <h1>QUIZZIE</h1>
            <div className={Style.navs}>
                <Link to={'/dashboard'} className={currentNav == 'dashboard' ? Style.hoverEffect : ''}
                    onClick={() => { setCurrentNav('dashboard'); changeToggle(false) }}>Dashboard</Link>

                <Link to={'/analytics'} className={currentNav == 'analytics' ? Style.hoverEffect : ''}
                    onClick={() => { setCurrentNav('analytics'); changeToggle(false) }}>Analytics</Link>

                <Link to={'/create-quize'} className={currentNav == 'create-quize' ? Style.hoverEffect : ''}
                    onClick={() => { setCurrentNav('create-quize'); changeToggle(false) }}>Create Quize</Link>
            </div>
            <h2 onClick={logoutHandler}>LOGOUT</h2>
        </div>
    )
}

export default SideBar;
