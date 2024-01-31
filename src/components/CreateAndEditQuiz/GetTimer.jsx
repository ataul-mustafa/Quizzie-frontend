import React, { useContext } from 'react'
import Style from './GetTimer.module.css'
import { quizeContext } from '../../Context API/QuizeContext'

const GetTimer = () => {
    const { quizeData, setQuizeData } = useContext(quizeContext)

    //fuction to handle timer change
    const timeHandler = (val) => {
        setQuizeData({ ...quizeData, timePerQuestion: val })
    }

    return (
        <>
            <div className={Style.timer} style={{ display: quizeData.quizeType == 'poll' ? 'none' : 'block' }}>
                <h2>Timer</h2>
                <div className={quizeData.timePerQuestion == 'OFF' ? Style.bgRed : ''}
                    onClick={() => { timeHandler('OFF') }}>OFF</div>

                <div className={quizeData.timePerQuestion == '5' ? Style.bgRed : ''}
                    onClick={() => { timeHandler('5') }}>5 Sec</div>

                <div className={quizeData.timePerQuestion == '10' ? Style.bgRed : ''}
                    onClick={() => { timeHandler('10') }}>10 Sec</div>
            </div>
        </>
    )
}

export default GetTimer
