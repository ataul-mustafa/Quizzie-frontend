import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import { useParams } from 'react-router-dom';
import Loader from '../utils/globalLoader/Loader';
import ShowQuizeQuestion from '../components/TakeQuize/ShowQuizeQuestion';
import CompletedQuize from '../components/TakeQuize/CompletedQuize';
import { quizeContext } from '../Context API/QuizeContext';

const TakeQuize = () => {
    const { loading, setLoading } = useContext(quizeContext)

    const [questions, setQuestion] = useState([]);
    const [choosedOptions, setChoosedOptions] = useState([]);
    const [timer, setTimer] = useState(null);
    const [currentPopup, setCurrentPopup] = useState('takeQuize');
    const [completedPopupInfo, setCompletedPopupInfo] = useState({
        result: null,
        quizeType: '',
        totalQuize: null,
    });

    //getting quizeId from parameter of url
    const { id } = useParams()

    //function to fetch quizes from api set into respective states
    const fetchQ = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`https://quizie-backend.onrender.com/api/quize/get-one/${id}`)
            console.log(data)
            setChoosedOptions(Array(data.questions.length).fill(null));
            setQuestion(data.questions);
            setTimer((data.time && data.time !== "OFF") && data.time);

            setCompletedPopupInfo({
                ...completedPopupInfo,
                quizeType: data.quizeType,
                totalQuize: data.questions.length,
            })

        } catch (error) {
            toast.error(error?.response?.data?.error);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchQ();
    }, [])


    //function to submit quize and send data to api
    const submitHandler = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post('https://quizie-backend.onrender.com/api/quize/save-result', {
                quizeId: id,
                choosedOptions,
            })
            setCompletedPopupInfo({
                ...completedPopupInfo,
                result: data.correctAttempts,
            });
            toast.success(data.message);
            setCurrentPopup('finish')
        } catch (error) {
            toast.error(error.response.data.error)
        }
        setLoading(false)
    }

    //some style for popup model
    const popupContentStyle = {
        borderRadius: "10px",
        width: window.innerWidth <= 768 ? '100%' : '90%',
        height: window.innerWidth <= 768 ? '100%' : '90%',
    };


    return (
        <>
            <Popup open={true}
                closeOnDocumentClick={false}
                contentStyle={popupContentStyle}
            >
                {loading && <Loader />}
                <div>
                    {
                        currentPopup == 'takeQuize' ?
                            <ShowQuizeQuestion
                                questions={questions}
                                time={timer}
                                setOpt={setChoosedOptions}
                                choosedOptions={choosedOptions}
                                submitHandler={submitHandler}
                            /> :
                            <CompletedQuize data={completedPopupInfo} />
                    }
                </div>
            </Popup >
        </>
    )
}

export default TakeQuize
