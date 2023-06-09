import React, { useContext, useState } from 'react';
import parse from '../../parse';
import { GlobalContext } from '../GlobalContext.jsx';
import './questions.css';

function AnswerForm({
  setOpenForm, question, setBurn, burn,
}) {
  const { product } = useContext(GlobalContext);
  const [answerBody, setAnswerBody] = useState('');
  const [userName, setName] = useState('');
  const [userEmail, setEmail] = useState('');
  const [inputErr, setInputErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);

  const submitForm = (event) => {
    event.preventDefault();
    if (!answerBody.length && !userName.length && !userEmail.length) {
      setInputErr(true);
      return;
    }
    if (!userEmail.includes('@') && !userEmail.includes('.com')) {
      setEmailErr(true);
    } else {
      setOpenForm(false);
      parse.post(`/qa/questions/${question.question_id}/answers`, {
        body: answerBody,
        name: userName,
        email: userEmail,
      })
        .then(() => setBurn(!burn))
        .catch((err) => console.log('unable to add use questions', err));
    }
  };

  return (
    <>
      <div type="button" aria-label="Save" role="button" tabIndex={0} onKeyDown={() => {}} className="modal-form" onClick={() => setOpenForm(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Submit your Answer</h5>
            <h6 className="subheading">
              {product?.name}
              :&ensp;
              {`${question.question_body.slice(0, 30)}...`}
            </h6>
            {inputErr && <p className="invalidInput">You must enter the following:</p>}
            {emailErr && <p className="invalidInput">Invalid Email</p>}
          </div>
          <button type="button" className="closeBtn" onClick={() => setOpenForm(false)}>
          </button>
          <div className="modalContent">
            <form>
              <text className="label">Your Answer (mandatory)</text>
              <textarea data-testid="input1" onChange={(event) => setAnswerBody(event.target.value)} className="qformBar" maxLength="1000" type="text" onInvalid="alert('You must fill out the form!');" required />
              <br />
              <br />
              <text className="label">What is your nickname (mandatory)</text>
              <input data-testid="input2" onChange={(event) => setName(event.target.value)} className="formBar" maxLength="60" placeholder="Example: jack543!" type="text" onInvalid="alert('You must fill out the form!');" required />
              <br />
              <br />
              <text className="label">Your email (mandatory)</text>
              <input data-testid="input3" onChange={(event) => setEmail(event.target.value)} className="formBar" maxLength="60" placeholder="Example: jack@email.com" type="text" onInvalid="alert('You must fill out the form!');" required />
              <p>For authentication reasons, you will not be emailed</p>
            </form>
            <br />

          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button
                type="button"
                className="submitBtn"
                data-testid="submit"
                onClick={(event) => {
                  submitForm(event);
                }}
              >
                Submit
              </button>
              <button
                type="button"
                className="cancelBtn"
                data-testid="cancel"
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
