import React, { useState } from 'react'
import Style from './GetTimer.module.css'
const GetTimer = ({quizeData}) => {

    const [timer, setTimer] = useState(quizeData.timePerQuestion); 

    const timeHandler = (val) => {
        setTimer(val)
        quizeData.timePerQuestion = val;
    }

    return (
        <>
            <div className={Style.timer} style={{ display: quizeData.quizeType == 'poll' ? 'none' : 'block' }}>
                <h2>Timer</h2>
                <div className={timer == 'OFF' ? Style.bgRed : ''}
                    onClick={() => { timeHandler('OFF') }}>OFF</div>

                <div className={timer == '5' ? Style.bgRed : ''}
                    onClick={() => { timeHandler('5') }}>5 Sec</div>

                <div className={timer == '10' ? Style.bgRed : ''}
                    onClick={() => { timeHandler('10') }}>10 Sec</div>
            </div>
        </>
    )
}

export default GetTimer
