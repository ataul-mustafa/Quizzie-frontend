import React, { useContext, useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import GetQuizeNameAndType from '../components/CreateAndEditQuiz/GetQuizeNameAndType'
import GetAllQuestions from '../components/CreateAndEditQuiz/GetAllQuestions';
import CompletedPopup from '../components/CreateAndEditQuiz/CompletedPopup';
import { quizeContext } from '../Context API/QuizeContext';
import Loader from '../utils/globalLoader/Loader';

const CreateQuize = ({ type }) => {
  const { resetQuizeData, loading } = useContext(quizeContext);

  const [isOpen, setIsOpen] = useState(true);
  const [currentPopup, setCurrentPopup] = useState('nameType');

  //redirecting to question popup if we are updating a quize
  useEffect(() => {
    if (type == 'update') {
      setCurrentPopup('question')
    } else {
      resetQuizeData()
    }
  }, [])

  const popupContentStyle = {
    borderRadius: "10px",
    width: window.innerWidth <= 768 && '100vw',
    zIndex: 1
  };

  return (
    <div>
      <Popup open={isOpen}
        closeOnDocumentClick={false}
        onClose={() => { setIsOpen(false) }}
        contentStyle={popupContentStyle}
      >
        {loading && <Loader />}

        {
          currentPopup == 'nameType' ?
            <GetQuizeNameAndType changePopup={setCurrentPopup} /> :
            currentPopup == 'question' ?
              <GetAllQuestions changePopup={setCurrentPopup} type={type} /> :
              <CompletedPopup changePopup={setCurrentPopup} />
        }
      </Popup>
    </div>
  )
}

export default CreateQuize