import React from 'react';
import trophy from '../../utils/images/trophy.png'
import Style from './CompletedQuize.module.css'

const CompletedQuize = ({ data }) => {

    return (
        <div className={Style.finishQuizeContainer}>
            {
                (data.quizeType == 'QnA') ?
                    <div className={Style.qnaQuizeMessage}>
                        <h1>Congrats Quiz is completed</h1>
                        <img src={trophy} alt="" />
                        <h2>Your Score is <span>{`0${data.result}/0${data.total}`}</span></h2>
                    </div> :
                    <div className={Style.pollFinishMessage}>
                        <h1>Thank you
                            for participating in the Poll</h1>
                    </div>
            }
        </div>
    )
}

export default CompletedQuize
