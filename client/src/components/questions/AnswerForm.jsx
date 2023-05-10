import React from 'react';
import './questions.css';
import { RiCloseLine } from "react-icons/ri";

function AnswerForm({ setOpenForm }) {
  return (
    <>
     <div className="darkBG" onClick={() => setOpenForm(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Have an Answer to this Question?</h5>
          </div>
          <button type="button" className="closeBtn" onClick={() => setOpenForm(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modalContent">
            <input className="formBar" placeholder="ADD YOUR ANSWER HERE..." />
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button type="button" className="submitBtn" onClick={() => setOpenForm(false)}>
                Submit
              </button>
              <button
                type="button"
                className="cancelBtn"
                onClick={() => setOpenForm(false)}
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

export default AnswerForm;
