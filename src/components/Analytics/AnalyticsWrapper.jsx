import React, { useState, useEffect, useContext } from 'react'
import Style from './Analytics.module.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import { getFormatedDate, getFormatedNo } from '../../utils/Common Functions/common_functions';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoMdShare } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import DeleteConfirmationPopup from './DeleteConfirmationPopup';
import { quizeContext } from '../../Context API/QuizeContext';

const AnalyticsWrapper = () => {
    const navigate = useNavigate();
    const {setQuizeData, setLoading} = useContext(quizeContext)
    
    const [quizes, setQuizes] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [deletePopup, setDeletePopup] = useState({
        isOpen: false,
        id: ''
    })

    //function to fetch quizes from api set into respective states
    const fetchQuizes = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`https://quizie-backend.onrender.com/api/quize/get-all-of-user`, {
                headers: {
                    authorization: localStorage.getItem('authToken')
                }
            })

            setQuizes(data.quizes);
        } catch (error) {
            toast.error(error?.response?.data?.error);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchQuizes();
    }, [refresh])

   //function to handle when user click to copy the url
    const onCopyFun = () => {
        toast.success('Link copied to your clipboard')
    }

    //function to set quize data into quizeData state of quizeContext and naviagte
    const editHandler = (quiz) =>{
        const quize = quiz.quizeType == "QnA" ? {...quiz, questions: quiz.QnAQuestions}: {...quiz, questions: quiz.pollQuestions}
        setQuizeData(quize);
        navigate(`/edit-quize`)
    }

    //function that set quize data into quizeData state of quizeContext
    const qAnalysisHandler = (quiz) =>{
        setQuizeData(quiz);
    }

    return (
        <>
            <div className={Style.tableContainer}>
                <h1>Quiz Analysis</h1>
                <table>
                    <thead>
                        <tr>
                            <td>S.No.</td>
                            <td>Quiz Name</td>
                            <td>Created On</td>
                            <td>Impressions</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                        <tbody>
                        {
                            quizes.map((quize, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{quize.name}</td>
                                    <td>{getFormatedDate(quize.createdAt)}</td>
                                    <td>{getFormatedNo(quize.impressions)}</td>
                                    <td>
                                        <FaRegEdit onClick={()=>{editHandler(quize)}} />
                                        <RiDeleteBin6Fill onClick={() => { setDeletePopup({ isOpen: true, id: quize._id }) }} />
                                        <CopyToClipboard text={quize.url} onCopy={onCopyFun} >
                                            <IoMdShare />
                                        </CopyToClipboard>
                                    </td>
                                    <td>
                                        <Link onClick={()=>{qAnalysisHandler(quize)}} to={`q-analysis`}>
                                            Question Wise Analysis
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {quizes.length <= 0 && <h2>NO QUIZ HERE</h2>}
            </div>
            <DeleteConfirmationPopup
                popupInfo={deletePopup}
                setOpen={setDeletePopup}
                setLoading={setLoading}
                setRefresh={setRefresh}
            />
        </>
    )
}

export default AnalyticsWrapper
