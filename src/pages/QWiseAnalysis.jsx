import React, { useContext, useEffect, useState } from 'react'
import QuizQuestionAnalysis from '../components/QuesAnalysis/QuizQuestionAnalysis';
import PollQuestionAnalysis from '../components/QuesAnalysis/PollQuestionAnalysis';
import { quizeContext } from '../Context API/QuizeContext';

const QWiseAnalysis = () => {
    const { quizeData } = useContext(quizeContext)

    return (
        <>
            <div>
                {
                    quizeData?.quizeType == 'QnA' ?
                        <QuizQuestionAnalysis quizeData={quizeData} /> :
                        <PollQuestionAnalysis pollData={quizeData} />
                }
            </div>
        </>
    )
}

export default QWiseAnalysis
