import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from '../components/SideBar/SideBar';

const HomePage = () => {
  const navigate = useNavigate();

  //redirect to auth page if token is not available in the localstorage
  useEffect(() => {
    const jwtToken = localStorage.getItem('authToken');
    if (!jwtToken) {
      navigate('/auth');
    }else{
      navigate('/dashboard')
    }
  }, [])

  return (
    <div style={{display: 'flex', height: '100vh'}}>
      <div>
        <SideBar />
      </div>
      <div style={{width: '82%', height: '100%', backgroundColor: '#EDEDED'}}>
        <Outlet />
      </div>
    </div>
  )
}

export default HomePage;
