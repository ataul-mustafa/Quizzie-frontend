import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Loader from '../utils/globalLoader/Loader';
import QuizQuestionAnalysis from '../components/QuesAnalysis/QuizQuestionAnalysis';
import PollQuestionAnalysis from '../components/QuesAnalysis/PollQuestionAnalysis';

const QWiseAnalysis = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [quize, setQuize] = useState({});

    const fetchQuizes = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`https://quizie-backend.onrender.com/api/quize/${id}`, {
                headers: {
                    authorization: localStorage.getItem('authToken')
                }
            })
            console.log(data)
            setQuize(data.quize);
        } catch (error) {
            toast.error(error?.response?.data?.error);
        }
        setLoading(false)
    }

    useEffect(()=>{
        fetchQuizes();
    },[])

    return (
        <>
        { loading && <Loader /> }
        <div>
            {
                quize?.quizeType == 'QnA' ?
                <QuizQuestionAnalysis quizeData={quize} /> : 
                <PollQuestionAnalysis pollData={quize} /> 
            }
        </div>
        </>
    )
}

export default QWiseAnalysis
