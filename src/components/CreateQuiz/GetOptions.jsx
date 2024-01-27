import React, { useState, useEffect } from 'react'
import { RiDeleteBin6Fill } from "react-icons/ri";
import Style from './GetOptions.module.css';

const GetOptions = ({ questions, quizeData, no, setQ }) => {

  //function to add one more option
  const addOption = () => {
    setQ((prevData) => {
      const newData = [...prevData];
      newData[no].options = [...(prevData[no].options), { option: '' }];
      return newData;
    })
  }

  //function to remove an option
  const removeOption = (val) => {
    setQ((prevData) => {
      const newData = [...prevData];
      newData[no].options = newData[no].options.filter((op, i) => i !== val)
      return newData;
    })
  }

  // console.log(quizeData)

  //function to update option data -->> onchange for option input
  const optionDataReciever = (e, i) => {
    const { name, value } = e.target;

    setQ((prevData) => {
      const newData = [...prevData];

      if (name === 'correctOption') {
        newData[no].correctOption = value;
      }

      if (name === 'textInput' || name === 'textImage1') {
        newData[no].options[i].text = value;
      }
      if (name === 'imageURLInput' || name === 'textImage2') {
        newData[no].options[i].imageURL = value;
      }

      return newData;
    });
  };

  //function to give the class to change the bg color to green of options
  const setOnClickBg = (i)=>{
   if(questions[no].correctOption == i && quizeData.quizeType == 'QnA'){
    return Style.bgGreen;
   }else{
    return ''
   }
   
  }


  return (
    <div className={Style.mainContainer}>
      <div className={Style.options}>
        {
          questions[no]?.options?.map((item, i) => (
            <div key={i}>
              <div className={Style.radioInput} >
                <input
                  style={quizeData.quizeType !== 'QnA' ? {display: 'none'}: {display: 'block'}}
                  type="radio"
                  id={'option' + i}
                  value={i + 1}
                  name='correctOption'
                  checked={questions[no].correctOption == i + 1}
                  onChange={(e) => { optionDataReciever(e, i) }}
                />
              </div>
              <div >
                {
                  questions[no].optionType == 'text' ?
                    <div>
                      <input type="text" value={item.text || ''}
                        className={setOnClickBg(i+1)}
                        onChange={(e) => { optionDataReciever(e, i) }}
                        name='textInput' placeholder='Text'
                      />
                      <div>
                        <RiDeleteBin6Fill style={i < 2 && { display: 'none' }} className={Style.deleteIcon} onClick={() => { removeOption(i) }} />

                      </div>
                    </div> :

                    questions[no].optionType == 'imageURL' ?
                      <div>
                        <input type="text" value={item.imageURL || ''}
                          className={setOnClickBg(i+1)}
                          onChange={(e) => { optionDataReciever(e, i) }}
                          name='imageURLInput' placeholder='Image URL'
                        />
                        <div>
                          <RiDeleteBin6Fill style={i < 2 && { display: 'none' }} className={Style.deleteIcon} onClick={() => { removeOption(i) }} />
                        </div>
                      </div> :

                      <div>
                        <input type="text" value={item.text || ''}
                          className={setOnClickBg(i+1)}
                          onChange={(e) => { optionDataReciever(e, i) }}
                          name='textImage1' placeholder='Text'
                        />

                        <input type="text" value={item.imageURL || ''}
                          className={setOnClickBg(i+1)}
                          onChange={(e) => { optionDataReciever(e, i) }}
                          name='textImage2' placeholder='Image URL'
                        />
                        <div>
                          <RiDeleteBin6Fill style={i < 2 && { display: 'none' }} className={Style.deleteIcon} onClick={() => { removeOption(i) }} />
                        </div>
                      </div>
                }
              </div>
            </div>
          ))
        }

        {
          questions[no].options.length < 4 &&
          <div className={Style.addButton} onClick={() => { addOption() }}>
            Add option
          </div>
        }
      </div>
    </div>
  )
}

export default GetOptions