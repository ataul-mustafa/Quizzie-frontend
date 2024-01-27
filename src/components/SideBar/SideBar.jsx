import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Style from './SideBar.module.css'
import { toast } from 'react-toastify';

const SideBar = () => {
    const navigate = useNavigate();
    const [currentNav, setCurrentNav] = useState('dashboard');

    const segments = (window.location.pathname).split('/');

    useEffect(() => {
        // Get the current pathname from the URL
        const firstSegment = segments[1];
        setCurrentNav(firstSegment)
    }, [segments]);

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
                    onClick={() => { setCurrentNav('dashboard') }}>Dashboard</Link>

                <Link to={'/analytics'} className={currentNav == 'analytics' ? Style.hoverEffect : ''}
                    onClick={() => { setCurrentNav('analytics') }}>Analytics</Link>

                <Link to={'/create-quize'} className={currentNav == 'create-quize' ? Style.hoverEffect : ''}
                    onClick={() => { setCurrentNav('create-quize') }}>Create Quize</Link>
            </div>
            <h2 onClick={logoutHandler}>LOGOUT</h2>
        </div>
    )
}

export default SideBar;
