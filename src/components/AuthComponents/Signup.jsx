import React, { useState } from 'react'
import axios from 'axios'
import Style from './auth.module.css'
import ButtonLoader from '../../utils/buttonLoader/ButtonLoader';
import { toast } from 'react-toastify';

const Signup = ({ authType, changeType }) => {
  
  const [loading, setLoading] = useState(false);
  const [authData, setAuthData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
    conPasswordError: '',
  })

  //function to validate all auth data
  const validateAuthData = () => {
    const err = {
      nameError: '',
      emailError: '',
      passwordError: '',
      conPasswordError: '',
    }
    let validated = false;

    if (!authData.name) {
      err.nameError = "Name is required!"
    } else if ((authData.name).length < 3) {
      err.nameError = "Name must contain min. 3 characters"
    }

    if (!authData.email) {
      err.emailError = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(authData.email)) {
      err.emailError = "Enter a valid email";
    }

    if (!authData.password) {
      err.passwordError = "Password is required";
    } else if ((authData.password).length < 6) {
      err.passwordError = "Password must contains min. 6 characters"
    }

    if (!authData.confirmPassword) {
      err.conPasswordError = "Confirm Password is required";
    }else if ((authData.confirmPassword).length < 6) {
      err.conPasswordError = "Password must contains min. 6 characters"
    } else if (authData.password !== authData.confirmPassword) {
      err.conPasswordError = "Password and confirm password are not matching"
    }

    if (!err.nameError && !err.emailError && !err.passwordError && !err.conPasswordError) {
      validated = true;
      setErrors({
        nameError: '',
        emailError: '',
        passwordError: '',
        conPasswordError: '',
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

    setLoading(true)
    if (validateAuthData()) {
      try {
        const {data} = await axios.post('https://quizie-backend.onrender.com/api/user/sign-up', authData);
        toast.success(data.message);

      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
    setLoading(false)
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
            <label htmlFor="name">Name</label>
            <input name='name' type="text" id='name' onChange={onInputChange} placeholder='Name' />
          </div>

          <div className={Style.error}>
            {
              errors.nameError && <p>{errors.nameError}</p>
            }
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input name='email' type="text" id='email' onChange={onInputChange} placeholder='Email' />
          </div>

          <div className={Style.error}>
            {
              errors.emailError && <p>{errors.emailError}</p>
            }
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input name='password' type="password" id='password' onChange={onInputChange} placeholder='Password' />
          </div>

          <div className={Style.error}>
            {
              errors.passwordError && <p>{errors.passwordError}</p>
            }
          </div>

          <div>
            <label htmlFor="conPassword">Confirm Password</label>
            <input name='confirmPassword' type="password" id='conPassword' onChange={onInputChange} placeholder='Confirm Password' />
          </div>

          <div className={Style.error}>
            {
              errors.conPasswordError && <p>{errors.conPasswordError}</p>
            }
          </div>

          {
            loading ? <ButtonLoader /> :
            <button type='submit'>Sing-Up</button>
          }
        </form>
      </div>
    </div>
  )
}

export default Signup
