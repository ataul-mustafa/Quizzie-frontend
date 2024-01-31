import React, { useContext } from 'react';
import Style from './GetQuizeNameAndType.module.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { quizeContext } from '../../Context API/QuizeContext';

const GetQuizeNameAndType = ({ changePopup }) => {
  const { quizeData, setQuizeData } = useContext(quizeContext);
  const navigate = useNavigate();

  //function to handle continue button
  const continueHandler = (e) => {
    e.preventDefault();

    if (quizeData.name && quizeData.quizeType && quizeData.name.length <= 10) {
      changePopup('question')
    } else if ((quizeData.name).length > 10) {
      toast.error("Name should be less 10 characters!")
    } else {
      toast.error("All fields are required!")
    }
  }

  //function to handle cancel button
  const cancelHandler = () => {
    navigate('/dashboard')
  }

  return (
    <div className={Style.createNameContainer}>
      <form>
        <div>
          <input type="text" onChange={(e) => { setQuizeData({ ...quizeData, name: e.target.value }) }} placeholder='Quize Name' />
        </div>
        <div>
          <label >Quize Type</label>

          <h2 className={quizeData.quizeType == 'QnA' ? Style.bgGreen : ''}
            onClick={() => { setQuizeData({ ...quizeData, quizeType: 'QnA' }) }}>Q & A</h2>

          <h2 className={quizeData.quizeType == 'poll' ? Style.bgGreen : ''}
            onClick={() => { setQuizeData({ ...quizeData, quizeType: 'poll' }) }}>Poll Type</h2>

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