import React from 'react';
import Style from './ButtonLoader.module.css';

const ButtonLoader = () => {
  return (
    <div className={Style.spinnerContainer}>
      <div className={Style.spinner}></div>
    </div>
  );
};

export default ButtonLoader;