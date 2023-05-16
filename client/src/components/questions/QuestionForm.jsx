import React, { useEffect, useContext, useState } from 'react';
import parse from '../../parse';
import { GlobalContext } from '../GlobalContext.jsx';
import './questions.css';
// import { RiCloseLine } from "react-icons/ri";

function QuestionFrom({ setIsOpen }) {
  const { productID } = useContext(GlobalContext);
  const [questionBody, setQuestionBody] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [inputError, setInputError] = useState(false);

  const submitForm = (event) => {
    event.preventDefault();
    if (questionBody.length && userName.length && userEmail.length) {
      setIsOpen(false);
      parse.post('/qa/questions', {
        body: questionBody,
        name: userName,
        email: userEmail,
        product_id: productID,
      })
        .then(() => console.log('question form submitted'))
        .catch((err) => console.log('unable to add use questions', err));
    } else {
      setInputError(true);
      console.log('INVLAID');
    }
  };

  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Have a Question?</h5>
            <h6 className="subheading">product name</h6>
            {inputError && <p className="invalidInput">You must enter the following:</p>}
          </div>
          <button type="button" className="closeBtn" onClick={() => setIsOpen(false)}>
            {/* <RiCloseLine style={{ marginBottom: "-3px" }} /> */}
          </button>
          <div className="modalContent">
            <form>
              <label className="label">Your Question (mandatory)</label>
              <textarea onChange={(event) => setQuestionBody(event.target.value)} className="qformBar" maxLength="1000" type="text" onInvalid="alert('You must fill out the form!');" required />
              <br />
              <br />
              <label className="label">What is your nickname (mandatory)</label>
              <input onChange={(event) => setUserName(event.target.value)} className="formBar" maxLength="60" placeholder="Example: jackson11!" type="text" onInvalid="alert('You must fill out the form!');" required />
              <br />
              <br />
              <label className="label">Your email (mandatory)</label>
              <input onChange={(event) => setUserEmail(event.target.value)} className="formBar" maxLength="60" placeholder="Why did you like the product or not?" type="text" onInvalid="alert('You must fill out the form!');" required />
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
                  // setIsOpen(false);
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
