import React, { useContext, useState } from 'react';
import parse from '../../parse';
import { GlobalContext } from '../GlobalContext.jsx';
import './questions.css';

function QuestionFrom({ setIsOpen }) {
  const { productID } = useContext(GlobalContext);
  const { product } = useContext(GlobalContext);
  const [questionBody, setQuestionBody] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [inputError, setInputError] = useState(false);
  const [emailErr, setEmailErr] = useState(false);

  const submitForm = (event) => {
    event.preventDefault();
    if (!questionBody.length && !userName.length && !userEmail.length) {
      setInputError(true);
      return;
    }
    if (!userEmail.includes('@') && !userEmail.includes('.com')) {
      setEmailErr(true);
    } else {
      setIsOpen(false);
      parse.post('/qa/questions', {
        body: questionBody,
        name: userName,
        email: userEmail,
        product_id: productID,
      })
        .then(() => console.log('question form submitted'))
        .catch((err) => console.log('unable to add use questions', err));
    }
  };

  return (
    <>
      <div className="modal-form" type="button" aria-label="Save" role="button" tabIndex={0} onKeyDown={() => {}} onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Have a Question?</h5>
            <h6 className="subheading">{product?.name}</h6>
            {inputError && <p className="invalidInput">You must enter the following:</p>}
            {emailErr && <p className="invalidInput">Invalid Email</p>}
          </div>
          <button type="button" className="closeBtn" onClick={() => setIsOpen(false)}>
          </button>
          <div className="modalContent">
            <form data-testid="questionForm">
              <text className="label">Your Question (mandatory)</text>
              <textarea className="qformBar" data-testid="input1" onChange={(event) => setQuestionBody(event.target.value)} maxLength="1000" type="text" onInvalid="alert('You must fill out the form!');" required />
              <br />
              <br />
              <text className="label">What is your nickname (mandatory)</text>
              <input data-testid="input2" onChange={(event) => setUserName(event.target.value)} className="formBar" maxLength="60" placeholder="Example: jackson11!" type="text" onInvalid="alert('You must fill out the form!');" required />
              <br />
              <br />
              <text className="label">Your email (mandatory)</text>
              <input data-testid="input3" onChange={(event) => setUserEmail(event.target.value)} className="formBar" maxLength="60" placeholder="Why did you like the product or not?" type="text" onInvalid="alert('You must fill out the form!');" required />
              <p>For authentication reasons, you will not be emailed</p>
            </form>
            <br />
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
