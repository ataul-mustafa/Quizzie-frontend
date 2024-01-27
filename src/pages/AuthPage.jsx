import React, { useEffect, useState } from 'react'
import Signup from '../components/AuthComponents/Signup'
import Login from '../components/AuthComponents/Login';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();
  const [authType, setAuthType] = useState('sign-up');

  //function to change signup to login and vice versa
  const changeTypeFun = (val) =>{
    setAuthType(val);
  }

  //redirecting to home page if authToken is available in localstorage
  useEffect(()=>{
    const jwtToken = localStorage.getItem('authToken');
    if(jwtToken){
      navigate('/dashboard')
    }
  }, [])

  return (
    <>
      {
        authType == 'sign-up' ? <Signup authType={authType} changeType={changeTypeFun} /> : 
        <Login authType={authType} changeType={changeTypeFun} />
      }
    </>
  )
}

export default AuthPage
