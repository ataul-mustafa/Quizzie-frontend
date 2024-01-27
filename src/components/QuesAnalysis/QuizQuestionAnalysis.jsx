import React from 'react'
import { getFormatedDate } from '../../utils/Common Functions/common_functions'
import Style from './QuestionAnalysis.module.css'

const QuizQuestionAnalysis = ({ quizeData }) => {
    console.log(quizeData.createdAt)
    return (
        <div className={Style.analysisContainer}>
            <div>
                <h1>{quizeData.name} Question Analysis</h1>
                <div>
                    <p>Created On :{` ${getFormatedDate(quizeData.createdAt)}`}</p>
                    <p>Impressions :{` ${quizeData.impressions}`}</p>
                </div>
            </div>
            <div>
                {
                    quizeData?.QnAQuestions?.map((q, i) => (
                        <div key={i}>
                            <h1>Q.{`${i+1} ${q.ques}`}</h1>
                            <div>
                                <div>
                                    <h1>{q.totalAttempts}</h1>
                                    <p>People Attempted the question</p>
                                </div>
                                <div>
                                    <h1>{q.correctAttempts}</h1>
                                    <p>People Answered Correctly</p>
                                </div>
                                <div>
                                    <h1>{q.totalAttempts - q.correctAttempts}</h1>
                                    <p>People Answered Incorrectly</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default QuizQuestionAnalysis
