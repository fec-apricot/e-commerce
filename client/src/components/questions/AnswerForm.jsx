import React, { useEffect, useContext, useState } from 'react';
import parse from '../../parse';
import { GlobalContext } from '../GlobalContext.jsx';
import './questions.css';
// import { RiCloseLine } from "react-icons/ri";

function AnswerForm({ setOpenForm, question }) {
  const { productID } = useContext(GlobalContext);
  const [answerBody, setAnswerBody] = useState('');
  const [userName, setName] = useState('');
  const [userEmail, setEmail] = useState('');
  const [images, setImages] = useState([]);

  const submitForm = (event) => {
    event.preventDefault();
    parse.post(`/qa/questions/${question.question_id}/answers`, {
      body: answerBody,
      name: userName,
      email: userEmail,
      photos: images,
      product_id: productID,
    })
      .then(() => console.log('question form submitted'))
      .catch((err) => console.log('unable to add use questions', err));
  };

  return (
    <>
     <div className="darkBG" onClick={() => setOpenForm(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Have an Answer to this Question?</h5>
          </div>
          <button type="button" className="closeBtn" onClick={() => setOpenForm(false)}>
            {/* <RiCloseLine style={{ marginBottom: "-3px" }} /> */}
          </button>
          <div className="modalContent">

            <form>
              <input onChange={(event) => setAnswerBody(event.target.value)} className="formBar" placeholder="ADD YOUR ANSWER HERE..." />
              <input onChange={(event) => setName(event.target.value)} className="formBar" placeholder="YOUR NAME..." />
              <input onChange={(event) => setEmail(event.target.value)} className="formBar" placeholder="YOUR EMAIL..." />
              <input onChange={(event) => setImages(event.target.value)} className="formBar" placeholder="YOUR IMAGES..." />
            </form>

          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button
                type="button"
                className="submitBtn"
                onClick={(event) => {
                  submitForm(event);
                  setOpenForm(false);
                }}
              >
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
