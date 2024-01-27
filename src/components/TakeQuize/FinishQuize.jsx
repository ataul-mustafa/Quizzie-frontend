import React from 'react';
import trophy from '../../utils/images/trophy.png'
import Style from './FinishQuize.module.css'

const FinishQuize = ({ total, result }) => {

    return (
        <div className={Style.finishQuizeContainer}>
            {
                (result >= 0 && result !== null) ?
                    <div className={Style.qnaQuizeMessage}>
                        <h1>Congrats Quiz is completed</h1>
                        <img src={trophy} alt="" />
                        <h2>Your Score is <span>{`0${result}/0${total}`}</span></h2>
                    </div> :
                    <div className={Style.pollFinishMessage}>
                        <h1>Thank you
                            for participating in the Poll</h1>
                    </div>
            }
        </div>
    )
}

export default FinishQuize
