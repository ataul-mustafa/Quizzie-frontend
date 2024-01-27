import React from 'react'
import Style from './GetQandOptionType.module.css'


const GetQandOptionType = ({questions, setQ, i, quizeType}) => {
 
    const onQChange = (e) =>{
        const { name, value } = e.target
        // const i = activeQuestion;

        setQ((prevData) => {
            const newData = [...prevData];
            if (name == 'ques') newData[i].ques = value;
            else if (name == 'optionType') newData[i].optionType = value;
            return newData;
        })
    }

  return (
    <div className={Style.qContainer}>
      <div className={Style.qInput}>
                <input type="text"
                    value={questions[i].ques || ''}
                    name='ques'
                    onChange={onQChange}
                    placeholder={quizeType == 'QnA' ? 'Q & A Question' : 'Poll Question'} />
            </div>

            <div className={Style.opType}>
                <h2>Option Type</h2>
                <div>
                    <input
                        id='text'
                        name='optionType'
                        value='text'
                        type="radio"
                        checked={questions[i].optionType == 'text'} 
                        onChange={onQChange}
                    />
                    <label htmlFor="text">Text</label>
                </div>

                <div>
                    <input
                        id='imgURL'
                        name='optionType'
                        value='imageURL'
                        type="radio"
                        checked={questions[i].optionType == 'imageURL'}
                        onChange={onQChange}
                    />
                    <label htmlFor="imgURL">Image URL</label>
                </div>

                <div>
                    <input
                        id='text&ImgURL'
                        name='optionType'
                        value='textAndImageURL'
                        type="radio"
                        checked={questions[i].optionType == 'textAndImageURL'}
                        onChange={onQChange}
                    />
                    <label htmlFor="text&ImgURL">Text & Image URL</label>
                </div>
            </div>
    </div>
  )
}

export default GetQandOptionType
