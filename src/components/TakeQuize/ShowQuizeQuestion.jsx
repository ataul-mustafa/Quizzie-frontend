import React, { useEffect, useState } from 'react'
import Style from './ShowQuizeQuestion.module.css'

const ShowQuizeQuestion = ({ question, no, time, length, submitHandler, setNo, setOpt, correctOptions }) => {

    const [button, setButton] = useState('NEXT');
    const [timer, setTimer] = useState(time);

    //Useeffect hook to change the seconds automatically
    useEffect(() => {
        let timerId;

        if (timer > 0 && timer !== null) {
            timerId = setTimeout(() => {
                setTimer((t) => t - 1)
            }, 1000)
        } else if (timer === 0) {
            changeQuestion()
        }

        return () => {
            // Clear the timer when the component unmounts or when the timer changes
            clearTimeout(timerId);
        };

    }, [timer])

    //initializing timer state with time prop
    useEffect(() => {
        if(length == 1){
            setButton('SUBMIT')
        }
        setTimer(time)
    }, [time])


    //function to move to the next question
    const changeQuestion = () => {
        if (no == length - 2) {
            setButton("SUBMIT")
        }

        //submitting the quize
        if (no == length - 1) {
            setTimer('00')
            submitHandler()
        } else {
            setTimer(time)
            setNo((no) => {
                if (no < length - 1) {
                    return no + 1;
                } else {
                    return no;
                }
            })
        }
    }


    //function to add correct option's index to the array
    const addCorrOption = (i) => {
        setOpt((opts) => {
            let newData = [...opts];
            newData[no] = i;
            return newData;
        })
    }

    return (
        <div className={Style.takeQuizeContainer}>
            <div>
                <h2>{`0${no + 1}/0${length}`}</h2>
                <h2>
                    {
                        time && `00:${timer}s`
                    }
                </h2>
            </div>
            <div>
                <h1>{question?.ques}</h1>
            </div>
            <div>
                {
                    question?.options?.map((option, i) => (
                        <div key={i}>
                            {
                                question.optionType == 'text' ?
                                    <div onClick={() => { addCorrOption(i + 1) }}
                                        style={{ borderColor: correctOptions[no] == i + 1 ? '#5076FF' : 'transparent' }}
                                    >
                                        <p>{option.text}</p>
                                    </div> :

                                    question.optionType == 'imageURL' ?
                                        <div onClick={() => { addCorrOption(i + 1) }}
                                            style={{ borderColor: correctOptions[no] == i + 1 ? '#5076FF' : 'transparent' }}
                                        >
                                            <img src={option.imageURL} alt='Invalid image address' />
                                        </div> :

                                        <div className={Style.imageAndText}
                                            onClick={() => { addCorrOption(i + 1) }}
                                            style={{ borderColor: correctOptions[no] == i + 1 ? '#5076FF' : 'transparent' }}
                                        >
                                            <p>{option.text}</p>
                                            <img src={option.imageURL} alt='Invalid image address' />
                                        </div>
                            }
                        </div>
                    ))
                }
            </div>
            <div>
                <button onClick={changeQuestion}>{button}</button>
            </div>
        </div>

    )
}

export default ShowQuizeQuestion
