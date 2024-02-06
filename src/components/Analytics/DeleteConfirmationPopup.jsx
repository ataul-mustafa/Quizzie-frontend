import React, { useContext } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import Style from './DeleteConfirmationPopup.module.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { quizeContext } from '../../Context API/QuizeContext';

const DeleteConfirmationPopup = ({ popupInfo, setOpen, setRefresh }) => {
  const { setLoading } = useContext(quizeContext);

  //function to delete a particular quize
  const deleteQuize = async () => {
    setOpen({ isOpen: false, id: '' })
    setLoading(true)
    try {
      const { data } = await axios.delete(`https://quizie-backend.onrender.com/api/quize/${popupInfo?.id}`, {
        headers: {
          authorization: localStorage.getItem('authToken')
        }
      });
      setRefresh((prev) => !prev)
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  //some style for popup model
  const popupContentStyle = {
    borderRadius: "10px",
    width: window.innerWidth <= 768 ? '100%' : '845px',
    height: '345px',
  };

  return (
    <>
      <Popup open={popupInfo.isOpen}
        closeOnDocumentClick
        onClose={() => { setOpen({ isOpen: false, id: '' }) }}
        contentStyle={popupContentStyle}
      >
        <div className={Style.deletePopup}>
          <h1>Are you confirm you want to delete ?</h1>
          <div>
            <button onClick={deleteQuize}>Confirm Delete</button>
            <button onClick={() => { setOpen({ isOpen: false, id: '' }) }}>Cancel</button>
          </div>
        </div>
      </Popup>
    </>
  )
}

export default DeleteConfirmationPopup
