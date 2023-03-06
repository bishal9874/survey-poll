import React, { useState } from "react";
import Surveydata from "../../data.json";
import DashboardCard from "../card/DashboardCard";
import PopUp from "../card/PopUp";
import SmallCard from "../card/SmallCard";
import "./Homepage.css";
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

const Homepage = ({ setIsLoggedIn }) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState({
    category: "", // set a default value for category
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  // const [selectCurrentSurvey, setselectCurrentSurvey] = useState(0);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((current) => current + 1);
  };

  const handleAnswerClick = (survey) => {
    setSelectedSurvey(survey);
    setButtonPopup(true);
  };

  // {
  //   Surveydata.data.map((survey) =>
  //     console.log(survey.category === "survey" ? survey.json_data.surveys : " ")
  //   );
  // }

  

  return (
    <>
      <h1 className="titleforHome">
        You are now {Surveydata.data[0].client_name} SERVICES {" "}{" "}
        {/* <img
          className="logo"
          src={Surveydata.data[1].client_logo}
          alt=""
          srcset=""
        />{" "} */}
         POLL and SURVEY{" "}
      </h1>
      <DashboardCard className="dashboard_items">
        {Surveydata.data.map((survey) => (
          <React.Fragment key={survey.id}>
            <SmallCard>
              <h1 className="catagories">{survey.category}</h1>
              <p className="survey-title">{survey.survey_title}</p>
              <button
                type="submit"
                className="answer-button"
                onClick={() => handleAnswerClick(survey)}
              >
                answer
              </button>
            </SmallCard>
            {/* for poll popUP  */}
            {buttonPopup && selectedSurvey.category === "poll" ? (
              <PopUp trigger={buttonPopup}>
                <div className="popup-container">
                  <div className="point">{selectedSurvey.point} <span className="Point-text">Point</span></div> 
                  <p className="poll-question">
                    {selectedSurvey.json_data.surveys.question1.question}
                  </p>
                  {selectedSurvey.json_data.surveys.question1.options.map(
                    (option, index) => (
                      <div className="options" key={index}>
                        <div className="option-container">
                          <input type="checkbox"/> {"   "}
                          {option.label}
                        </div>
                      </div>
                    )
                  )}
                </div>
                <button
                  className="close-btn"
                  onClick={() => setButtonPopup(false)}
                >
                  Close
                </button>
              </PopUp>
            ) : /*  SUrvey POPUP  */

            selectedSurvey.category === "survey" && buttonPopup ? ( // for  Survey Popup
              <PopUp trigger={buttonPopup}>
                <div className="Suyvey_popup">
                  {/* <p>{selectedSurvey.json_data.surveys.question1.question}</p> */}

                  <div className="question-section">
                    <div className="question-text">
                     <div className="font-line">
                       ┃
                      </div> 
                  {"   "}{
                        selectedSurvey.json_data.surveys[
                          `question${currentQuestionIndex}`
                        ].question
                      }
                    </div>
                    {/* <div className="question-count">
                      <span>counter</span>
                    </div> */}
                    {selectedSurvey.json_data.surveys[
                      `question${currentQuestionIndex}`
                    ].options.map((option, index) => (
                      <div key={`option-${option.label}`}>
                        <input
                          type="radio"
                          id={`option-${option.label}`}
                          name={option.label}
                          value={option.value}
                        />
                        <label htmlFor={`option-${option.label}`}>{option.label}</label>
                      </div>
                    ))}
                    <div className="actions">
                      <button
                        onClick={handleNextQuestion}
                        disabled={
                          currentQuestionIndex >=
                          Object.keys(selectedSurvey.json_data.surveys).length
                        }
                      >

                        next<b>➙</b>
                      </button>
                    </div>
                  </div>
                </div>

                {/* CLose Button  */}
                <button
                  className="close-btn"
                  onClick={() => setButtonPopup(false)}
                >
                  Close
                </button>
              </PopUp>
            ) : null}
          </React.Fragment>
        ))}
      </DashboardCard>

      {/* logout Button */}
      <button className="back_button" onClick={() => setIsLoggedIn(false)}>
        Logout
      </button>
    </>
  );
};

export default Homepage;
