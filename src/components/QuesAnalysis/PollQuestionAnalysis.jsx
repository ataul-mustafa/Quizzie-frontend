import React from 'react'
import { getFormatedDate } from '../../utils/Common Functions/common_functions'
import Style from './QuestionAnalysis.module.css'

const PollQuestionAnalysis = ({pollData}) => {
  console.log(pollData.createdAt)
  return (
    <div className={Style.analysisContainer}>
            <div>
                <h1>{pollData.name} Question Analysis</h1>
                <div>
                    <p>Created On :{` ${getFormatedDate(pollData.createdAt)}`}</p>
                    <p>Impressions :{` ${pollData.impressions}`}</p>
                </div>
            </div>
            <div>
                {
                    pollData?.pollQuestions?.map((q, i) => (
                        <div key={i}>
                            <h1>Q.{`${i+1} ${q.ques}`}</h1>
                            <div>
                              {
                                q.options.map((op, j)=>(
                                  <div className={Style.pollCard} key={j}>
                                    <h1>{op.totalChoosed}</h1>
                                    <p>{`option ${j+1}`}</p>
                                </div>
                                ))
                              }
                                
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
  )
}

export default PollQuestionAnalysis
