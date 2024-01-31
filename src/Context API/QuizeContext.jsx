import React, { createContext, useState } from 'react'

export const quizeContext = createContext();

const dummyQuize = {
  name: '',
  quizeType: '',
  questions: [
    {
      ques: '',
      optionType: 'text',
      options: [
        {
          text: '',
          imageURL: '',
        },
        {
          text: '',
          imageURL: '',
        },
      ],
      correctOption: null,
    }
  ],

  timePerQuestion: '',
}

const ContextProvider = ({ children }) => {
  const [quizeData, setQuizeData] = useState(dummyQuize);
  const [loading, setLoading] = useState(false);
  const [quizeURL, setQuizeURL] = useState('');

  const resetQuizeData = () => {
    setQuizeData(dummyQuize)
  }

  return (
    <quizeContext.Provider value={{ quizeData, setQuizeData, loading, setLoading, resetQuizeData, quizeURL, setQuizeURL }}>
      {children}
    </quizeContext.Provider>
  )
}

export default ContextProvider
