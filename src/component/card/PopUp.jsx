import React, { useState, useEffect } from 'react';
import './PopUp.css';

const PopUp = (props) => {
  const [showPopup, setShowPopup] = useState(props.trigger);
  const [timer, setTimer] = useState(5); // 5 seconds

  useEffect(() => {
    if (props.trigger) {
      setShowPopup(true);
      const timerId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      const timeoutId = setTimeout(() => {
        setShowPopup(false);
      }, 5000);
      return () => {
        clearInterval(timerId);
        clearTimeout(timeoutId);
      };
    } else {
      setShowPopup(false);
    }
  });

  const handleClosePopup = () => {
    setShowPopup(false);
    setTimer(5); // reset the timer when the popup is closed manually
    props.setTrigger(true); // set the trigger to true to allow the popup to be opened again
  };

  return showPopup ? (
    <div className="popUp">
      <div className="popup-inner">
        <button className="close-btn" onClick={handleClosePopup}>
          Close
        </button>
        <div className="popup-content">
          {props.children}
          <div className="timer">{`Closing in ${timer} seconds...`}</div>
        </div>
      </div>
    </div>
  ) : null;
};

export default PopUp;
