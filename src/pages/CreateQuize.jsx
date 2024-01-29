import React, { useEffect, useMemo, useState } from 'react'
import { quizeInfo } from '../utils/dummyObjects/quize'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import GetQuizeNameAndType from '../components/CreateQuiz/GetQuizeNameAndType'
import GetAllQuestions from '../components/CreateQuiz/GetAllQuestions';
import CompletedPopup from '../components/CreateQuiz/CompletedPopup';


const CreateQuize = ({ quizeInfor = {}, type = 'create' }) => {

  const [quizeData, setQuizeData] = useState(quizeInfo);
  const [isOpen, setIsOpen] = useState(true);
  const [currentPopup, setCurrentPopup] = useState('nameType');
  const [url, setUrl] = useState('');

  //function to recive quize name of quize type from respective component
  const nameTypeReciever = (data) => {
    setQuizeData({ ...quizeData, ...data })
  }

  //function to handle the change of popup
  const popupChanger = (val) => {
    setCurrentPopup(val)
  }

  useEffect(() => {
    if (type == 'update' && quizeInfor) {
      setQuizeData(quizeInfor)
      setCurrentPopup('question')
    }
  }, [type])

  return (
    <div>
      <Popup open={isOpen}
        closeOnDocumentClick
        onClose={() => { setIsOpen(false) }}
        contentStyle={{ borderRadius: "10px" }}
      >
        {
          currentPopup == 'nameType' ?
            <GetQuizeNameAndType sendNameType={nameTypeReciever} changePopup={popupChanger} /> :
            currentPopup == 'question' ?
              <GetAllQuestions setUrl={setUrl} changePopup={popupChanger} quizeData={quizeData} type={type}/> :
              <CompletedPopup url={url} changePopup={popupChanger} />
        }

      </Popup>
    </div>
  )
}

export default CreateQuize