import React, { useEffect, useContext, useState } from 'react';
import parse from '../../parse';
import { GlobalContext } from '../GlobalContext.jsx';
import { OverviewContext } from '../overview/OverviewContext.jsx';
import './questions.css';
// import { RiCloseLine } from "react-icons/ri";

function AnswerForm({ setOpenForm, question }) {
  // const { productID } = useContext(GlobalContext);
  // const { product } = useContext(OverviewContext);
  const [answerBody, setAnswerBody] = useState('');
  const [userName, setName] = useState('');
  const [userEmail, setEmail] = useState('');
  const [inputErr, setInputErr] = useState(false);
  // const [images, setImages] = useState([]);
  // console.log('PRODUCT', product)

  const submitForm = (event) => {
    event.preventDefault();
    if (answerBody.length && userName.length && userEmail.length) {
      setOpenForm(false);
      parse.post(`/qa/questions/${question.question_id}/answers`, {
        body: answerBody,
        name: userName,
        email: userEmail,
      })
        .then(() => console.log('question form submitted'))
        .catch((err) => console.log('unable to add use questions', err));
    } else {
      setInputErr(true);
      console.log('INVLAID');
    }
  };

  return (
    <>
     <div className="darkBG" onClick={() => setOpenForm(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Submit your Answer</h5>
            <h6 className="subheading">product name: {question.question_body}</h6>
          {inputErr && <p className="invalidInput">You must enter the following:</p>}
          </div>
          <button type="button" className="closeBtn" onClick={() => setOpenForm(false)}>
            {/* <RiCloseLine style={{ marginBottom: "-3px" }} /> */}
          </button>
          <div className="modalContent">
            <form>
              <label className="label">Your Answer (mandatory)</label>
              <textarea onChange={(event) => setAnswerBody(event.target.value)} className="qformBar" maxLength="1000" type="text" onInvalid="alert('You must fill out the form!');" required />
              <br />
              <br />
              <label className="label">What is your nickname (mandatory)</label>
              <input onChange={(event) => setName(event.target.value)} className="formBar" maxLength="60" placeholder="Example: jack543!" type="text" onInvalid="alert('You must fill out the form!');" required />
              <br />
              <br />
              <label className="label">Your email (mandatory)</label>
              <input onChange={(event) => setEmail(event.target.value)} className="formBar" maxLength="60" placeholder="Example: jack@email.com" type="text" onInvalid="alert('You must fill out the form!');" required />
              <p>For authentication reasons, you will not be emailed</p>
              {/* <input onChange={(event) => setImages(event.target.value)} className="formBar" placeholder="YOUR IMAGES..." /> */}
            </form>
            <br />

          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button
                type="button"
                className="submitBtn"
                onClick={(event) => {
                  submitForm(event);
                  // setOpenForm(false);
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
