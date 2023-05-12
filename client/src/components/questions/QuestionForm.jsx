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

  const submitForm = (event) => {
    event.preventDefault();
    parse.post('/qa/questions', {
      body: questionBody,
      name: userName,
      email: userEmail,
      product_id: productID,
    })
      .then(() => console.log('question form submitted'))
      .catch((err) => console.log('unable to add use questions', err));
  };
  // .then(() => {
  //   parse.get(`/qa/questions/?product_id=${productID}&page=30&count=4`)
  //     .then((data) => setQuestions(data.results))
  //     .catch((err) => console.log(err));
  // }, [productID]);

  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Have a Question?</h5>
          </div>
          <button type="button" className="closeBtn" onClick={() => setIsOpen(false)}>
            {/* <RiCloseLine style={{ marginBottom: "-3px" }} /> */}
          </button>
          <div className="modalContent">

            <form>
              <label className="label">Your Question (mandatory)</label>
              <input onChange={(event) => setQuestionBody(event.target.value)} className="qformBar" />
              <br />
              <br />
              <label className="label">What is your nickname (mandatory)</label>
              <input onChange={(event) => setUserName(event.target.value)} className="formBar" placeholder="Example: jackson11!" />
              <br />
              <br />
              <label className="label">Your email (mandatory)</label>
              <input onChange={(event) => setUserEmail(event.target.value)} className="formBar" placeholder="Why did you like the product or not?" />
              <p>For authentication reasons, you will not be emailed</p>
            </form>

          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button
                type="button"
                className="submitBtn"
                onClick={(event) => {
                  submitForm(event);
                  setIsOpen(false);
                }}
              >
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
