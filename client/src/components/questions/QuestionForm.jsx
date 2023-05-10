import React from 'react';
import './questions.css';
import { RiCloseLine } from "react-icons/ri";

function QuestionFrom({ setIsOpen }) {
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Have a Question?</h5>
          </div>
          <button type="button" className="closeBtn" onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modalContent">
            <input className="formBar" placeholder="ADD YOUR QUESTION HERE..." />
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button type="button" className="submitBtn" onClick={() => setIsOpen(false)}>
                Submit
              </button>
              <button
                type="button"
                className="cancelBtn"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionFrom;
