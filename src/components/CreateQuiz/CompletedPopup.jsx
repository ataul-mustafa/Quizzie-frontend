import React from 'react'
import Style from './CompletedPopup.module.css'
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

const CompletedPopup = ({url}) => {

  const onCopyFun = () =>{
    toast.success('Link copied to your clipboard')
  }

  return (
    <div className={Style.CompletedPopupContainer}>
      <Link to={'/dashboard'}>
        <RxCross2 className={Style.closeIcon} />
      </Link>
      <h1>Congrats your Quiz is Published!</h1>
      <div>{url}</div>
      <CopyToClipboard text={url} onCopy={onCopyFun} >
          <button>Share</button>
        </CopyToClipboard>
    </div>
  )
}

export default CompletedPopup
