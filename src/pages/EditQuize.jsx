import React, { useEffect, useState } from 'react'
import CreateQuize from './CreateQuize'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../utils/globalLoader/Loader';

const EditQuize = () => {
  const {id} = useParams();

  const [loading, setLoading] = useState(true);
  const [quizeData, setQuizeData] = useState({})

  const fetchQuizes = async () => {
    try {
        const { data } = await axios.get(`https://quizie-backend.onrender.com/api/quize/${id}`, {
            headers: {
                authorization: localStorage.getItem('authToken')
            }
        })

        setQuizeData(data.quize)
        console.log(data)
        
    } catch (error) {
      console.log(error)
        toast.error(error?.response?.data?.error);
    }
    setLoading(false)
}


useEffect(()=>{
    fetchQuizes();
},[id])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        quizeData && <CreateQuize quizeInfor={quizeData} type={'update'} />
      )}
    </>
  )
}

export default EditQuize
