import React, { useState } from 'react';
import Style from './GetQuizeNameAndType.module.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const GetQuizeNameAndType = ({sendNameType, changePopup}) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    quizeType: '',
  })

  //function to handle continue button
  const continueHandler = (e) =>{
    e.preventDefault();

    if(data.name && data.quizeType && data.name.length <= 10){
      sendNameType(data)
      changePopup('question')
    }else if((data.name).length > 10){
      toast.error("Name should be less 10 characters!")
    }else{
      toast.error("All fields are required!")
    }
  }

  //function to handle cancel button
  const cancelHandler = () =>{
    navigate('/dashboard')
  }

  return (
    <div className={Style.createNameContainer}>
      <form>
        <div>
          <input type="text" onChange={(e)=>{setData({...data, name: e.target.value})}} placeholder='Quize Name' />
        </div>
        <div>
          <label >Quize Type</label>

          <h2 className={data.quizeType == 'QnA' ? Style.bgGreen : ''}
          onClick={()=>{setData({...data, quizeType: 'QnA'})}}>Q & A</h2>

          <h2 className={data.quizeType == 'poll' ? Style.bgGreen : ''}
          onClick={()=>{setData({...data, quizeType: 'poll'})}}>Poll Type</h2> 

        </div>
        <div className={Style.buttons}>
          <button onClick={cancelHandler}>Cancel</button>
          <button className={Style.bgGreen} onClick={continueHandler}>Continue</button>
        </div>
      </form>
    </div>
  )
}

export default GetQuizeNameAndType
