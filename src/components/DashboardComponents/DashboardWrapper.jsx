import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import Header from './Header';
import Style from './DashboardWrapper.module.css';
import QuizeCard from './QuizeCard';
import { toast } from 'react-toastify';
import { quizeContext } from '../../Context API/QuizeContext';

const DashboardWrapper = () => {
    const { setLoading } = useContext(quizeContext)
    const [headerInfo, setHeaderInfo] = useState({
        totalQuizes: null,
        totalQuestions: null,
        totalImpressions: null
    });
    const [allQuizes, setAllQuizes] = useState([]);

    //function to fetch quizes from api set into respective states
    const fetchQuizes = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`https://quizie-backend.onrender.com/api/quize/get-all`, {
                headers: {
                    authorization: localStorage.getItem('authToken')
                }
            })
            setHeaderInfo({
                totalQuizes: data.totalQuizes,
                totalQuestions: data.totalQuestions,
                totalImpressions: data.totalImpressions,
            })
            setAllQuizes(data.quizes);
        } catch (error) {
            toast.error(error?.response?.data?.error);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchQuizes();
    }, [])

    return (
        <>
            <div className={Style.DashboardContainer}>
                <div>
                    <Header info={headerInfo} />
                </div>
                <div>
                    <h1>Trending Quizes</h1>
                    <div>
                        {
                            allQuizes.map((quize, i) => (
                                <QuizeCard quizeData={quize} key={i} />
                            ))
                        }
                    </div>
                    {allQuizes.length <= 0 && <h2>NO QUIZ HERE</h2>}
                </div>
            </div>
        </>
    )
}

export default DashboardWrapper
