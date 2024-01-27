import React, { useState } from 'react'
import Style from './auth.module.css'
import axios from 'axios';
import ButtonLoader from '../../utils/buttonLoader/ButtonLoader';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = ({ authType, changeType }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    emailError: '',
    passwordError: '',
  })

  //function to validate all auth data
  const validateAuthData = () => {
    const err = {
      emailError: '',
      passwordError: '',
    }
    let validated = false;

    if (!authData.email) {
      err.emailError = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(authData.email)) {
      err.emailError = "Enter a valid email";
    }

    if (!authData.password) {
      err.passwordError = "Password is required";
    }

    if (!err.emailError && !err.passwordError) {
      validated = true;
      setErrors({
        emailError: '',
        passwordError: '',
      })
    } else {
      setErrors(err)
    }

    return validated;
  }

  //function to handle input element change state
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setAuthData({ ...authData, [name]: value })
  }

  //function to submit the signup form if there is no any error
  const onSubmitFun = async(e) => {
    e.preventDefault();

    setLoading(true);
    if (validateAuthData()) {
      try {
        const {data} = await axios.post('https://quizie-backend.onrender.com/api/user/login', authData)

        //saving jwt token in localstorage
        localStorage.setItem("authToken", data.jwtToken)
        toast.success(data.message);

        navigate('/')
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
    setLoading(false);

   }
  return (
    <div className={Style.authWrapper} >
      <div className={Style.authCard}>
        <h1>QUIZZIE</h1>
        <div className={Style.authType}>
          <p className={authType === 'sign-up' ? Style.authTypeHover : ''}
            onClick={() => { changeType('sign-up') }}>Sign Up</p>
          <p className={authType === 'log-in' ? Style.authTypeHover : ''}
            onClick={() => { changeType('log-in') }}>Log In</p>

        </div>
        <form onSubmit={onSubmitFun}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' id='email' onChange={onInputChange} placeholder='Email' />
          </div>

          <div className={Style.error}>
            {
              errors.emailError && <p>{errors.emailError}</p>
            }
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' id='password' onChange={onInputChange} placeholder='Password' />
          </div>

          <div className={Style.error}>
            {
              errors.passwordError && <p>{errors.passwordError}</p>
            }
          </div>

          {
            loading ? <ButtonLoader /> : 
            <button type='submit'>Log-in</button>
          }
        </form>
      </div>
    </div>
  )
}

export default Login;
