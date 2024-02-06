import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from '../components/SideBar/SideBar';
import Style from './HomePage.module.css'
import { RiMenu2Line } from "react-icons/ri";

const HomePage = () => {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);

  //redirect to auth page if token is not available in the localstorage
  useEffect(() => {
    const jwtToken = localStorage.getItem('authToken');
    if (!jwtToken) {
      navigate('/auth');
    } else {
      navigate('/dashboard')
    }
  }, [])

  return (
    <div className={Style.homeContainer} >
      <div className={Style.menuIcon}>
          <RiMenu2Line onClick={()=>{setOpenMenu(!openMenu)}} />
        </div>
      <div className={openMenu ? `${Style.sideBar} ${Style.openMenu}`: Style.sideBar} >
        <SideBar changeToggle={setOpenMenu} />
      </div>
      <div className={Style.contentArea} >
        <Outlet />
      </div>
    </div>
  )
}

export default HomePage;
