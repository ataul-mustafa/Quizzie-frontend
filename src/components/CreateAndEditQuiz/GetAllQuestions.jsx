import React, { useContext, useState } from 'react'
import Style from './GetAllQuestions.module.css'
import { IoMdAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import GetQandOptionType from './GetQandOptionType';
import GetOptions from './GetOptions';
import { toast } from 'react-toastify';
import axios from 'axios';
import GetTimer from './GetTimer';
import { useNavigate } from 'react-router-dom';
import { quizeContext } from '../../Context API/QuizeContext';

const GetAllQuestions = ({ changePopup, type = 'create' }) => {
    const navigate = useNavigate()
    const { quizeData, setQuizeData, resetQuizeData, setLoading, setQuizeURL } = useContext(quizeContext);

    //state for current question's index
    const [activeQuestion, setActiveQuestion] = useState(0);

    //function to add one more question
    const addQuestion = () => {
        const dummyQ = {
            ques: '',
            optionType: 'text',
            options: [
                {
                    text: '',
                    imageURL: '',
                },
                {
                    text: '',
                    imageURL: '',
                },
            ],
            correctOption: null,
        }
        if (quizeData.questions.length < 5) {
            setQuizeData({ ...quizeData, questions: [...quizeData.questions, { ...dummyQ }] })
        }
    }

    //function to remove a question
    const removeQuestion = (val) => {
        if (val > 0) {
            setQuizeData((prevData) => {
                const filteredQ = prevData.questions.filter((q, i) => i != val);
                return { ...prevData, questions: filteredQ }
            })
        }

        if (val == quizeData.questions.length - 1) {
            setActiveQuestion(val - 1);
        }
    }

    //function to validate all quizedata
    const validateQuizeData = () => {
        let validate = false;

        if (!quizeData.timePerQuestion && quizeData.quizeType == 'QnA') {
            toast.error("Please select the timer")
            return validate;
        }
        for (let i = 0; i < quizeData.questions.length; i++) {
            if (!quizeData.questions[i].ques) {
                toast.error(`Enter the Question no. ${i + 1}`)
                return validate;
            }
            for (let j = 0; j < quizeData.questions[i].options.length; j++) {
                if ((!quizeData.questions[i].options[j].text && quizeData.questions[i].optionType == 'text') || (!quizeData.questions[i].options[j].imageURL && quizeData.questions[i].optionType == 'imageURL') || ((!quizeData.questions[i].options[j].text || !quizeData.questions[i].options[j].imageURL) && quizeData.questions[i].optionType == 'textAndImageURL')) {
                    toast.error(`Enter all options in Q.${i + 1}`);
                    return validate;
                }
            }

            if (!quizeData.questions[i].correctOption && quizeData.quizeType == 'QnA') {
                toast.error(`Select correct option in Q.${i + 1}`)
                return validate;
            }
        }

        return true;
    }

    //function to submit data of create quize
    const submitCreateQuize = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post('https://quizie-backend.onrender.com/api/quize/create', quizeData, {
                headers: {
                    Authorization: localStorage.getItem('authToken')
                }
            })
            if (data.success) {
                setQuizeURL(data.url);
                toast.success(data.message);
                resetQuizeData()
                changePopup('lastPopup');
            }
        } catch (error) {
            toast.error(error.response.data.error)
        }
        setLoading(false);
    }

    //function to submit data of edit quize
    const submitEditQuize = async () => {
        setLoading(true);
        try {
            const { data } = await axios.put(`https://quizie-backend.onrender.com/api/quize/${quizeData._id}`, quizeData, {
                headers: {
                    Authorization: localStorage.getItem('authToken')
                }
            })
            if (data.success) {
                setQuizeURL(data.url);
                toast.success(data.message);
                resetQuizeData()
                changePopup('lastPopup');
            }
        } catch (error) {
            toast.error(error.response.data.error)
        }
        setLoading(false);
    }

    //function to submit the quize on the api
    const submitQuize = async (e) => {
        e.preventDefault();
        if (validateQuizeData()) {
            if (type == 'create') {
                await submitCreateQuize();
            } else {
                await submitEditQuize();
            }
        }
    }

    //function to handle cancle button 
    const cancelHandler = () => {
        if(type == 'create'){
            navigate('/dashboard')
        }else {
            navigate('/analytics')
        }
    }

    return (
        <>
            <form onSubmit={submitQuize} className={Style.addQcontainer}>
                <div className={Style.addQ}>
                    <div className={Style.left}>
                        {
                            quizeData?.questions?.map((q, i) => (
                                <div key={i}>
                                    <div onClick={() => { setActiveQuestion(i) }}
                                        className={activeQuestion == i ? `${Style.addCircle} ${Style.bgGreen}` : Style.addCircle}>
                                        <h2>{i + 1}</h2>
                                    </div>

                                    <RxCross2 style={i == 0 && { display: 'none' }}
                                        className={Style.removeIcon}
                                        onClick={() => { removeQuestion(i) }}
                                    />

                                </div>
                            ))
                        }

                        <IoMdAdd className={Style.addIcon}
                            style={quizeData?.questions?.length == 5 && { display: 'none' }}
                            onClick={addQuestion}
                        />

                    </div>
                    <div className={Style.right}>
                        Max 5 questions
                    </div>
                </div>

                <div>
                    <GetQandOptionType i={activeQuestion} />
                </div>

                <div className={Style.optionsAndTimer}>
                    <GetOptions no={activeQuestion} />
                    <GetTimer />
                </div>

                <div className={Style.buttons}>
                    <button onClick={cancelHandler}>Cancel</button>
                    <button type='submit'>{type} Quize</button>
                </div>
            </form>
        </>
    )
}

export default GetAllQuestions